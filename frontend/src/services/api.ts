import type { BackendHealthStatus, UserProfile, UserProgress } from '../types/lms';

// Connect to backend via Vite proxy '/api' or fallback to direct localhost:8000
const API_BASE_URL = '/api';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const apiService = {
  /**
   * Check connection to the FastAPI backend and database
   */
  async checkBackendHealth(): Promise<BackendHealthStatus> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const [rootRes, dbRes] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/`, { signal: controller.signal }),
        fetch(`${API_BASE_URL}/db-test`, { signal: controller.signal })
      ]);

      clearTimeout(timeoutId);

      let online = false;
      let message = 'Backend Offline (Mock fallback active)';
      let dbConnected = false;

      if (rootRes.status === 'fulfilled' && rootRes.value.ok) {
        const rootData = await rootRes.value.json();
        online = true;
        message = rootData.message || 'FastAPI LMS Backend running';
      }

      if (dbRes.status === 'fulfilled' && dbRes.value.ok) {
        const dbData = await dbRes.value.json();
        dbConnected = dbData.database === 'connected';
      }

      return {
        online,
        message,
        dbConnected,
        checkedAt: new Date()
      };
    } catch {
      return {
        online: false,
        message: 'Backend connection pending / offline',
        dbConnected: false,
        checkedAt: new Date()
      };
    }
  },

  /**
   * Register a new user using the backend's real POST /auth/register endpoint
   */
  async registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // If backend is offline, proxy returns 502 Bad Gateway / 503 / 504
        if (response.status === 502 || response.status === 503 || response.status === 504) {
          console.warn(`Backend returned status ${response.status} (proxy gateway). Falling back to offline resilient storage.`);
          const mockUser: RegisterResponse = {
            id: Date.now(),
            name: payload.name,
            email: payload.email,
            role: 'student'
          };
          this.addLocalStudent({
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            role: 'student'
          });
          this.addManagedAccount({
            name: mockUser.name,
            email: mockUser.email,
            role: 'student',
            passwordPlain: payload.password,
            department: 'Computer Science & Engineering',
            regNumber: `REG-${String(mockUser.id).slice(-4)}`,
            lastLogin: 'Just registered',
            status: 'active'
          });
          return mockUser;
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Registration failed with status ${response.status}`);
      }

      const data: RegisterResponse = await response.json();
      
      // Cache student in local list as well so teacher dashboard reflects it
      this.addLocalStudent({
        id: data.id,
        name: data.name,
        email: data.email,
        role: 'student'
      });
      this.addManagedAccount({
        name: data.name,
        email: data.email,
        role: 'student',
        passwordPlain: payload.password,
        department: 'Computer Science & Engineering',
        regNumber: `REG-${String(data.id).slice(-4)}`,
        lastLogin: 'Just registered',
        status: 'active'
      });

      return data;
    } catch (err: unknown) {
      // If backend is offline or fails with network/gateway error, create local student profile gracefully
      const isOfflineOrNetworkError = 
        err instanceof TypeError || 
        (err instanceof Error && (
          err.message.includes('fetch') || 
          err.message.includes('502') || 
          err.message.includes('503') || 
          err.message.includes('504') ||
          err.message.includes('Failed to fetch') ||
          err.message.includes('NetworkError')
        ));

      if (isOfflineOrNetworkError) {
        console.warn('Backend unavailable, registering user in offline demo storage.');
        const mockUser: RegisterResponse = {
          id: Date.now(),
          name: payload.name,
          email: payload.email,
          role: 'student'
        };
        this.addLocalStudent({
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: 'student'
        });
        this.addManagedAccount({
          name: mockUser.name,
          email: mockUser.email,
          role: 'student',
          passwordPlain: payload.password,
          department: 'Computer Science & Engineering',
          regNumber: `REG-${String(mockUser.id).slice(-4)}`,
          lastLogin: 'Just registered',
          status: 'active'
        });
        return mockUser;
      }
      throw err;
    }
  },

  /**
   * Local storage helpers for demo persistence & offline fallback
   */
  getStoredUser(): UserProfile | null {
    const raw = localStorage.getItem('adaptive_lms_current_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  saveUser(user: UserProfile | null): void {
    if (!user) {
      localStorage.removeItem('adaptive_lms_current_user');
    } else {
      localStorage.setItem('adaptive_lms_current_user', JSON.stringify(user));
    }
  },

  getStoredProgress(): UserProgress {
    const raw = localStorage.getItem('adaptive_lms_user_progress');
    if (!raw) {
      return {
        cFundamentalsCompleted: false,
        completedCFundamentalLessonIds: [],
        completedDSTopicIds: [],
        completedVideoTopicIds: [],
        mcqScores: {},
        codingChallengesCompleted: {},
        streakDays: 4,
        hoursSpent: 12
      };
    }
    try {
      const parsed = JSON.parse(raw);
      if (!parsed.completedVideoTopicIds) {
        parsed.completedVideoTopicIds = [];
      }
      return parsed;
    } catch {
      return {
        cFundamentalsCompleted: false,
        completedCFundamentalLessonIds: [],
        completedDSTopicIds: [],
        completedVideoTopicIds: [],
        mcqScores: {},
        codingChallengesCompleted: {},
        streakDays: 4,
        hoursSpent: 12
      };
    }
  },

  saveProgress(progress: UserProgress): void {
    localStorage.setItem('adaptive_lms_user_progress', JSON.stringify(progress));
  },

  getLocalStudents(): UserProfile[] {
    const raw = localStorage.getItem('adaptive_lms_students_list');
    if (!raw) {
      const defaultStudents: UserProfile[] = [
        { id: 101, name: 'Ananya Sharma', email: 'ananya.s@annauniv.edu', role: 'student' },
        { id: 102, name: 'Karthik Raja', email: 'karthik.r@annauniv.edu', role: 'student' },
        { id: 103, name: 'Pooja Venkatesh', email: 'pooja.v@annauniv.edu', role: 'student' },
        { id: 104, name: 'Rahul Sundaram', email: 'rahul.s@annauniv.edu', role: 'student' }
      ];
      localStorage.setItem('adaptive_lms_students_list', JSON.stringify(defaultStudents));
      return defaultStudents;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  addLocalStudent(student: UserProfile): void {
    const list = this.getLocalStudents();
    if (!list.some(s => s.email === student.email)) {
      list.unshift(student);
      localStorage.setItem('adaptive_lms_students_list', JSON.stringify(list));
    }
  },

  /**
   * Managed User Accounts for Admin (Students, Faculty, Admin)
   */
  getManagedAccounts(): import('../types/lms').ManagedUserAccount[] {
    const raw = localStorage.getItem('adaptive_lms_managed_accounts');
    if (!raw) {
      const defaultAccounts: import('../types/lms').ManagedUserAccount[] = [
        {
          id: 101,
          name: 'Ananya Sharma',
          email: 'ananya.s@annauniv.edu',
          role: 'student',
          passwordPlain: 'password123',
          department: 'Computer Science & Engineering',
          regNumber: '210421104001',
          lastLogin: 'Today, 10:45 AM',
          status: 'active'
        },
        {
          id: 102,
          name: 'Karthik Raja',
          email: 'karthik.r@annauniv.edu',
          role: 'student',
          passwordPlain: 'karthik@2025',
          department: 'Computer Science & Engineering',
          regNumber: '210421104018',
          lastLogin: 'Yesterday, 04:20 PM',
          status: 'active'
        },
        {
          id: 103,
          name: 'Pooja Venkatesh',
          email: 'pooja.v@annauniv.edu',
          role: 'student',
          passwordPlain: 'pooja#lms',
          department: 'Information Technology',
          regNumber: '210421104035',
          lastLogin: '2 days ago',
          status: 'active'
        },
        {
          id: 104,
          name: 'Rahul Sundaram',
          email: 'rahul.s@annauniv.edu',
          role: 'student',
          passwordPlain: 'rahul@pass',
          department: 'Artificial Intelligence & DS',
          regNumber: '210421104042',
          lastLogin: '3 days ago',
          status: 'active'
        },
        {
          id: 901,
          name: 'Dr. R. Ramanathan',
          email: 'ramanathan@institution.edu',
          role: 'teacher',
          passwordPlain: 'faculty@123',
          department: 'Computer Science & Engineering',
          regNumber: 'FAC-1002',
          lastLogin: 'Today, 09:15 AM',
          status: 'active'
        },
        {
          id: 902,
          name: 'Prof. Meenakshi S.',
          email: 'meenakshi@institution.edu',
          role: 'teacher',
          passwordPlain: 'prof#2025',
          department: 'Information Technology',
          regNumber: 'FAC-1008',
          lastLogin: 'Yesterday, 11:30 AM',
          status: 'active'
        },
        {
          id: 999,
          name: 'System Administrator',
          email: 'admin@institution.edu',
          role: 'admin',
          passwordPlain: 'admin123',
          department: 'Academic Administration & IT',
          regNumber: 'ADM-001',
          lastLogin: 'Just now',
          status: 'active'
        }
      ];
      localStorage.setItem('adaptive_lms_managed_accounts', JSON.stringify(defaultAccounts));
      return defaultAccounts;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveManagedAccounts(accounts: import('../types/lms').ManagedUserAccount[]): void {
    localStorage.setItem('adaptive_lms_managed_accounts', JSON.stringify(accounts));
  },

  addManagedAccount(account: Omit<import('../types/lms').ManagedUserAccount, 'id'>): import('../types/lms').ManagedUserAccount {
    const accounts = this.getManagedAccounts();
    const newAccount: import('../types/lms').ManagedUserAccount = {
      ...account,
      id: Date.now()
    };
    accounts.unshift(newAccount);
    this.saveManagedAccounts(accounts);
    return newAccount;
  },

  resetPassword(userId: number, newPasswordPlain: string): boolean {
    const accounts = this.getManagedAccounts();
    const index = accounts.findIndex(a => a.id === userId);
    if (index !== -1) {
      accounts[index].passwordPlain = newPasswordPlain;
      this.saveManagedAccounts(accounts);

      // Best effort backend update
      fetch(`${API_BASE_URL}/admin/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newPassword: newPasswordPlain, email: accounts[index].email })
      }).catch(() => {
        // Silently keep local update
      });

      return true;
    }
    return false;
  },

  toggleAccountStatus(userId: number): boolean {
    const accounts = this.getManagedAccounts();
    const index = accounts.findIndex(a => a.id === userId);
    if (index !== -1) {
      accounts[index].status = accounts[index].status === 'active' ? 'suspended' : 'active';
      this.saveManagedAccounts(accounts);
      return true;
    }
    return false;
  },

  /**
   * Custom Subjects created by Admin
   */
  getCustomSubjects(): import('../types/lms').CustomSubject[] {
    const raw = localStorage.getItem('adaptive_lms_custom_subjects');
    if (!raw) {
      const defaultSubjects: import('../types/lms').CustomSubject[] = [
        {
          id: 'subj-cs3351',
          code: 'CS3351',
          title: 'Object Oriented Programming with Java',
          department: 'Computer Science & Engineering',
          regulation: 'Anna University 2025 Regulation',
          description: 'Comprehensive study of Java language fundamentals, Object-Oriented paradigms (Inheritance, Polymorphism, Encapsulation), Exception Handling, Collections Framework, and Multithreaded Programming.',
          units: [
            { unitNumber: 1, title: 'Foundations of Java & OOP', topics: ['JVM Architecture', 'Data Types & Control Flow', 'Classes, Objects & Constructors'] },
            { unitNumber: 2, title: 'Inheritance & Interfaces', topics: ['Super & This Keywords', 'Abstract Classes', 'Multiple Inheritance via Interfaces'] },
            { unitNumber: 3, title: 'Exception Handling & I/O', topics: ['Try-Catch-Finally', 'Custom Exceptions', 'Byte & Character Streams'] },
            { unitNumber: 4, title: 'Collections & Generics', topics: ['ArrayList, LinkedList, HashMap', 'Iterators', 'Generic Classes & Methods'] },
            { unitNumber: 5, title: 'Multithreading & GUI', topics: ['Thread Lifecycle', 'Synchronization', 'JavaFX / Swing Fundamentals'] }
          ],
          createdAt: new Date().toLocaleDateString(),
          createdBy: 'System Administrator'
        }
      ];
      localStorage.setItem('adaptive_lms_custom_subjects', JSON.stringify(defaultSubjects));
      return defaultSubjects;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveCustomSubjects(subjects: import('../types/lms').CustomSubject[]): void {
    localStorage.setItem('adaptive_lms_custom_subjects', JSON.stringify(subjects));
  },

  createCustomSubject(subject: Omit<import('../types/lms').CustomSubject, 'id' | 'createdAt'>): import('../types/lms').CustomSubject {
    const list = this.getCustomSubjects();
    const newSubject: import('../types/lms').CustomSubject = {
      ...subject,
      id: `subj-${Date.now()}`,
      createdAt: new Date().toLocaleDateString()
    };
    list.push(newSubject);
    this.saveCustomSubjects(list);

    // Best effort backend sync
    fetch(`${API_BASE_URL}/admin/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSubject)
    }).catch(() => {});

    return newSubject;
  },

  deleteCustomSubject(subjectId: string): boolean {
    const list = this.getCustomSubjects();
    const filtered = list.filter(s => s.id !== subjectId);
    this.saveCustomSubjects(filtered);
    return true;
  }
};
