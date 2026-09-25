import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Key, 
  Eye, 
  EyeOff, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Copy, 
  GraduationCap,
  ChevronLeft
} from 'lucide-react';
import type { UserProfile, BackendHealthStatus, ManagedUserAccount, CustomSubject } from '../types/lms';
import { apiService } from '../services/api';

interface AdminDashboardProps {
  user: UserProfile;
  health: BackendHealthStatus;
  onNavigate: (page: string) => void;
  onGoBack?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  health,
  onNavigate,
  onGoBack
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'subjects' | 'activity'>('users');
  
  // Users state
  const [accounts, setAccounts] = useState<ManagedUserAccount[]>(() => apiService.getManagedAccounts());
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<{ [id: number]: boolean }>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Reset Password Modal state
  const [resetModalUser, setResetModalUser] = useState<ManagedUserAccount | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [resetFeedback, setResetFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Add User Modal state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'student' as 'student' | 'teacher',
    department: 'Computer Science & Engineering',
    regNumber: '',
    passwordPlain: ''
  });
  const [addUserFeedback, setAddUserFeedback] = useState<string | null>(null);

  // Subjects state
  const [subjects, setSubjects] = useState<CustomSubject[]>(() => apiService.getCustomSubjects());
  const [showCreateSubjectModal, setShowCreateSubjectModal] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    code: '',
    title: '',
    department: 'Computer Science & Engineering',
    regulation: 'Anna University 2025 Regulation',
    description: '',
    unit1Title: 'Fundamentals & Architecture',
    unit1Topics: 'Introduction, Overview, Basic Concepts',
    unit2Title: 'Core Methodology',
    unit2Topics: 'Design Principles, Implementation, Workflows',
    unit3Title: 'Advanced Applications',
    unit3Topics: 'Optimization, Case Studies, Best Practices'
  });
  const [subjectFeedback, setSubjectFeedback] = useState<string | null>(null);

  // Password visibility toggle
  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copy credentials helper
  const handleCopyCredentials = (account: ManagedUserAccount) => {
    const text = `Email: ${account.email}\nPassword: ${account.passwordPlain}\nRole: ${account.role}`;
    navigator.clipboard.writeText(text);
    setCopiedId(account.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate strong random password
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPasswordInput(result);
  };

  // Execute Password Reset
  const handleExecuteResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalUser) return;
    if (!newPasswordInput.trim()) {
      setResetFeedback({ type: 'error', message: 'Password cannot be empty.' });
      return;
    }
    if (newPasswordInput.trim().length < 6) {
      setResetFeedback({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    const success = apiService.resetPassword(resetModalUser.id, newPasswordInput.trim());
    if (success) {
      setAccounts(apiService.getManagedAccounts());
      setResetFeedback({
        type: 'success',
        message: `Password successfully updated for ${resetModalUser.name}!`
      });
      setTimeout(() => {
        setResetModalUser(null);
        setNewPasswordInput('');
        setResetFeedback(null);
      }, 1400);
    } else {
      setResetFeedback({ type: 'error', message: 'Failed to reset password.' });
    }
  };

  // Execute Account Status Toggle
  const handleToggleStatus = (id: number) => {
    apiService.toggleAccountStatus(id);
    setAccounts(apiService.getManagedAccounts());
  };

  // Execute Add User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setAddUserFeedback(null);

    if (!newUserForm.name.trim() || !newUserForm.email.trim() || !newUserForm.passwordPlain.trim()) {
      setAddUserFeedback('Please fill in name, email, and initial password.');
      return;
    }

    apiService.addManagedAccount({
      name: newUserForm.name.trim(),
      email: newUserForm.email.trim().toLowerCase(),
      role: newUserForm.role,
      passwordPlain: newUserForm.passwordPlain.trim(),
      department: newUserForm.department,
      regNumber: newUserForm.regNumber.trim() || `ID-${Math.floor(1000 + Math.random() * 9000)}`,
      lastLogin: 'Never',
      status: 'active'
    });

    setAccounts(apiService.getManagedAccounts());
    setShowAddUserModal(false);
    setNewUserForm({
      name: '',
      email: '',
      role: 'student',
      department: 'Computer Science & Engineering',
      regNumber: '',
      passwordPlain: ''
    });
  };

  // Execute Create Subject
  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    setSubjectFeedback(null);

    if (!subjectForm.code.trim() || !subjectForm.title.trim() || !subjectForm.description.trim()) {
      setSubjectFeedback('Please fill in Subject Code, Title, and Description.');
      return;
    }

    const units = [
      {
        unitNumber: 1,
        title: subjectForm.unit1Title.trim() || 'Unit 1: Fundamentals',
        topics: subjectForm.unit1Topics.split(',').map(t => t.trim()).filter(Boolean)
      },
      {
        unitNumber: 2,
        title: subjectForm.unit2Title.trim() || 'Unit 2: Core Concepts',
        topics: subjectForm.unit2Topics.split(',').map(t => t.trim()).filter(Boolean)
      },
      {
        unitNumber: 3,
        title: subjectForm.unit3Title.trim() || 'Unit 3: Applied Principles',
        topics: subjectForm.unit3Topics.split(',').map(t => t.trim()).filter(Boolean)
      }
    ];

    apiService.createCustomSubject({
      code: subjectForm.code.trim().toUpperCase(),
      title: subjectForm.title.trim(),
      department: subjectForm.department,
      regulation: subjectForm.regulation,
      description: subjectForm.description.trim(),
      units,
      createdBy: user.name
    });

    setSubjects(apiService.getCustomSubjects());
    setShowCreateSubjectModal(false);
    setSubjectForm({
      code: '',
      title: '',
      department: 'Computer Science & Engineering',
      regulation: 'Anna University 2025 Regulation',
      description: '',
      unit1Title: 'Fundamentals & Architecture',
      unit1Topics: 'Introduction, Overview, Basic Concepts',
      unit2Title: 'Core Methodology',
      unit2Topics: 'Design Principles, Implementation, Workflows',
      unit3Title: 'Advanced Applications',
      unit3Topics: 'Optimization, Case Studies, Best Practices'
    });
  };

  // Delete Custom Subject
  const handleDeleteSubject = (id: string) => {
    if (confirm('Are you sure you want to delete this subject from the active curriculum?')) {
      apiService.deleteCustomSubject(id);
      setSubjects(apiService.getCustomSubjects());
    }
  };

  // Filter accounts
  const filteredAccounts = accounts.filter(acc => {
    const matchesRole = roleFilter === 'all' || acc.role === roleFilter;
    const matchesSearch = 
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (acc.regNumber && acc.regNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (acc.department && acc.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const studentCount = accounts.filter(a => a.role === 'student').length;
  const teacherCount = accounts.filter(a => a.role === 'teacher').length;
  const adminCount = accounts.filter(a => a.role === 'admin').length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onGoBack ? onGoBack() : onNavigate('student-dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Previous View</span>
          </button>
        </div>

        {/* Top Header Banner */}
        <div className="admin-header-banner flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Institutional Administration Console • {user.name} ({health.online ? 'FastAPI Connected' : 'Local Standby'})</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ADMIN CONTROL PANEL
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Centralized institutional administrative privileges: oversee student and faculty credentials, inspect and reset passwords, and manage multi-department curriculum subjects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student View</span>
            </button>
            <button
              onClick={() => onNavigate('teacher-dashboard')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Faculty Portal</span>
            </button>
          </div>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Total Students</div>
              <div className="text-2xl font-bold text-sky-400 mt-1">{studentCount}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Enrolled Learners</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Faculty Members</div>
              <div className="text-2xl font-bold text-purple-400 mt-1">{teacherCount}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Professors & Instructors</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Active Subjects</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{1 + subjects.length}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">C+DS & Custom Streams</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Security Status</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">Managed</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Password Control Enabled</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Key className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs-nav flex space-x-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('users')}
            className={`admin-tab-btn flex items-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users'
                ? 'admin-tab-active bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Students & Faculty Management ({accounts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`admin-tab-btn flex items-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'subjects'
                ? 'admin-tab-active bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Subject & Curriculum Creator ({1 + subjects.length})</span>
          </button>
        </div>

        {/* TAB 1: USERS & PASSWORD MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 mr-1 font-semibold">Filter:</span>
                <button
                  onClick={() => setRoleFilter('all')}
                  className={`admin-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    roleFilter === 'all'
                      ? 'admin-filter-active bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  All ({accounts.length})
                </button>
                <button
                  onClick={() => setRoleFilter('student')}
                  className={`admin-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    roleFilter === 'student'
                      ? 'admin-filter-active bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Students ({studentCount})
                </button>
                <button
                  onClick={() => setRoleFilter('teacher')}
                  className={`admin-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    roleFilter === 'teacher'
                      ? 'admin-filter-active bg-purple-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Faculty ({teacherCount})
                </button>
                <button
                  onClick={() => setRoleFilter('admin')}
                  className={`admin-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    roleFilter === 'admin'
                      ? 'admin-filter-active bg-amber-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Admins ({adminCount})
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, email, reg no..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="btn-admin-primary px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>
            </div>

            {/* User Directory Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="admin-table-head bg-slate-800/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800 font-semibold">
                  <tr>
                    <th className="px-5 py-4">User & Department</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Institutional Email</th>
                    <th className="px-5 py-4">Password (Admin View)</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                        No users found matching the filter or search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAccounts.map((account) => {
                      const isRevealed = !!visiblePasswords[account.id];
                      return (
                        <tr key={account.id} className="hover:bg-slate-800/40 transition-colors">
                          {/* User info */}
                          <td className="px-5 py-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                                account.role === 'admin'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : account.role === 'teacher'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              }`}>
                                {account.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-white text-sm">
                                  {account.name}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {account.regNumber ? `${account.regNumber} • ` : ''}{account.department || 'Anna University'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Role Badge */}
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              account.role === 'admin'
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                : account.role === 'teacher'
                                ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                                : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                            }`}>
                              {account.role === 'teacher' ? 'Faculty' : account.role}
                            </span>
                          </td>

                          {/* Email */}
                          <td className="px-5 py-4 font-mono text-[11px] text-slate-300">
                            {account.email}
                          </td>

                          {/* Password viewing */}
                          <td className="px-5 py-4">
                            <div className="admin-password-box flex items-center space-x-2 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 w-fit">
                              <span className="font-mono text-xs font-semibold text-amber-300 min-w-[70px]">
                                {isRevealed ? account.passwordPlain : '••••••••'}
                              </span>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(account.id)}
                                className="p-1 text-slate-400 hover:text-white transition-colors"
                                title={isRevealed ? 'Hide Password' : 'Show Password'}
                              >
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCopyCredentials(account)}
                                className="p-1 text-slate-400 hover:text-white transition-colors"
                                title="Copy credentials"
                              >
                                {copiedId === account.id ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <button
                              onClick={() => handleToggleStatus(account.id)}
                              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                                account.status === 'active'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              }`}
                              title="Click to toggle account access"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${account.status === 'active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                              <span className="capitalize">{account.status}</span>
                            </button>
                          </td>

                          {/* Reset Password Action */}
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => {
                                setResetModalUser(account);
                                setNewPasswordInput('');
                                setResetFeedback(null);
                              }}
                              className="btn-admin-reset-pw px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 transition-all shadow-sm inline-flex items-center space-x-1"
                            >
                              <Key className="w-3.5 h-3.5" />
                              <span>Reset Password</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SUBJECT & CURRICULUM CREATOR */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Active Curriculum Subjects</h3>
                <p className="text-xs text-slate-400">
                  Subjects configured here appear directly in the student pathways and faculty curriculum listings.
                </p>
              </div>

              <button
                onClick={() => setShowCreateSubjectModal(true)}
                className="btn-admin-primary px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Subject</span>
              </button>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Core Subject: C + Data Structures */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-sky-500/40 relative shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      Core Institutional Curriculum
                    </span>
                    <span className="text-xs font-mono text-slate-400">CS3301</span>
                  </div>

                  <h4 className="text-xl font-bold text-white">
                    C Programming & Data Structures
                  </h4>
                  <div className="text-xs text-sky-400 mt-1 font-medium">
                    Anna University 2025 Regulation • CSE, IT, AI&DS
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Complete prerequisite C Programming fundamentals followed by Linked Lists, Stacks, Queues, Trees, and Graphs with interactive test-runner & step-by-step studio.
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Curriculum Units</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                        1. C Pointers & Memory
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                        2. Linear Lists & Stacks
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                        3. Queues & Trees (BST)
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                        4. AVL Trees & Graphs
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>System Default Subject</span>
                  <span className="text-emerald-400 font-semibold">Active & Live</span>
                </div>
              </div>

              {/* Admin Custom Subjects */}
              {subjects.map((subj) => (
                <div key={subj.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all relative shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Admin Created Subject
                      </span>
                      <span className="text-xs font-mono text-amber-400 font-bold">{subj.code}</span>
                    </div>

                    <h4 className="text-xl font-bold text-white">
                      {subj.title}
                    </h4>
                    <div className="text-xs text-amber-400/90 mt-1 font-medium">
                      {subj.regulation} • {subj.department}
                    </div>

                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {subj.description}
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Configured Units ({subj.units.length})</div>
                      <div className="space-y-1.5">
                        {subj.units.map(u => (
                          <div key={u.unitNumber} className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/40 text-xs text-slate-300 flex justify-between">
                            <span className="font-semibold text-white">Unit {u.unitNumber}: {u.title}</span>
                            <span className="text-[11px] text-slate-400">{u.topics.length} topics</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Created: {subj.createdAt}</span>
                    <button
                      onClick={() => handleDeleteSubject(subj.id)}
                      className="px-2.5 py-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>

      {/* MODAL: RESET PASSWORD */}
      {resetModalUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="admin-modal-card bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Reset User Password</h3>
                  <p className="text-xs text-slate-400">Admin Security Override</p>
                </div>
              </div>
              <button
                onClick={() => setResetModalUser(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteResetPassword} className="mt-5 space-y-4">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1">
                <div className="text-slate-400">Target User:</div>
                <div className="font-bold text-white text-sm">{resetModalUser.name}</div>
                <div className="font-mono text-amber-400">{resetModalUser.email}</div>
                <div className="text-[11px] text-slate-400 capitalize">Role: {resetModalUser.role}</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Current Password: <span className="font-mono text-white bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">{resetModalUser.passwordPlain}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    ⚡ Generate Strong
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter new password (min 6 characters)"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  required
                />
              </div>

              {resetFeedback && (
                <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                  resetFeedback.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                }`}>
                  {resetFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span>{resetFeedback.message}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setResetModalUser(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-admin-primary px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-colors shadow-md"
                >
                  Save & Apply Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD USER */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="admin-modal-card bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Enroll New Institutional User</h3>
                  <p className="text-xs text-slate-400">Add Student or Faculty Member</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Account Role</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as 'student' | 'teacher' })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Faculty / Instructor</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sudharsan R."
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Institutional Email</label>
                <input
                  type="email"
                  placeholder="e.g. sudharsan@annauniv.edu"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Reg No / ID</label>
                  <input
                    type="text"
                    placeholder="210421104050"
                    value={newUserForm.regNumber}
                    onChange={(e) => setNewUserForm({ ...newUserForm, regNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Initial Password</label>
                  <input
                    type="text"
                    placeholder="Initial password"
                    value={newUserForm.passwordPlain}
                    onChange={(e) => setNewUserForm({ ...newUserForm, passwordPlain: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    required
                  />
                </div>
              </div>

              {addUserFeedback && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {addUserFeedback}
                </div>
              )}

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-admin-primary px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-colors"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW SUBJECT */}
      {showCreateSubjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="admin-modal-card bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Create New Curriculum Subject</h3>
                  <p className="text-xs text-slate-400">Directly adds subject to student & faculty dashboards</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateSubjectModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS3401"
                    value={subjectForm.code}
                    onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 uppercase font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Regulation & Sem</label>
                  <input
                    type="text"
                    placeholder="e.g. Anna Univ 2025 Regulation"
                    value={subjectForm.regulation}
                    onChange={(e) => setSubjectForm({ ...subjectForm, regulation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subject Title</label>
                <input
                  type="text"
                  placeholder="e.g. Database Management Systems"
                  value={subjectForm.title}
                  onChange={(e) => setSubjectForm({ ...subjectForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Department</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science & Engineering"
                  value={subjectForm.department}
                  onChange={(e) => setSubjectForm({ ...subjectForm, department: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Description & Overview</label>
                <textarea
                  rows={3}
                  placeholder="Provide an overview of the curriculum, objectives, and laboratory requirements..."
                  value={subjectForm.description}
                  onChange={(e) => setSubjectForm({ ...subjectForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  required
                />
              </div>

              <div className="border-t border-slate-800 pt-3">
                <div className="font-bold text-white text-xs mb-2">Curriculum Units Setup</div>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <div className="font-semibold text-amber-300">Unit 1</div>
                    <input
                      type="text"
                      placeholder="Unit 1 Title"
                      value={subjectForm.unit1Title}
                      onChange={(e) => setSubjectForm({ ...subjectForm, unit1Title: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="Topics (comma separated)"
                      value={subjectForm.unit1Topics}
                      onChange={(e) => setSubjectForm({ ...subjectForm, unit1Topics: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-[11px]"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <div className="font-semibold text-amber-300">Unit 2</div>
                    <input
                      type="text"
                      placeholder="Unit 2 Title"
                      value={subjectForm.unit2Title}
                      onChange={(e) => setSubjectForm({ ...subjectForm, unit2Title: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="Topics (comma separated)"
                      value={subjectForm.unit2Topics}
                      onChange={(e) => setSubjectForm({ ...subjectForm, unit2Topics: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-[11px]"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <div className="font-semibold text-amber-300">Unit 3</div>
                    <input
                      type="text"
                      placeholder="Unit 3 Title"
                      value={subjectForm.unit3Title}
                      onChange={(e) => setSubjectForm({ ...subjectForm, unit3Title: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="Topics (comma separated)"
                      value={subjectForm.unit3Topics}
                      onChange={(e) => setSubjectForm({ ...subjectForm, unit3Topics: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {subjectFeedback && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {subjectFeedback}
                </div>
              )}

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateSubjectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-admin-primary px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-colors shadow-md"
                >
                  Publish Subject to LMS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
