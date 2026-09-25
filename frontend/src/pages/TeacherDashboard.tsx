import { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  BarChart2, 
  FolderTree, 
  Search, 
  Plus, 
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import type { UserProfile, BackendHealthStatus } from '../types/lms';
import { apiService } from '../services/api';
import { DS_TOPICS } from '../data/curriculumData';

interface TeacherDashboardProps {
  user: UserProfile;
  health: BackendHealthStatus;
  onNavigate: (page: string) => void;
  onGoBack?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  health,
  onNavigate,
  onGoBack
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'content' | 'analytics' | 'topics'>('students');
  const [searchStudent, setSearchStudent] = useState('');
  
  // Registered students list from local storage / backend sync
  const [students] = useState<UserProfile[]>(() => apiService.getLocalStudents());

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
    s.email.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onGoBack ? onGoBack() : onNavigate('student-dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-purple-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Previous View</span>
          </button>
        </div>

        {/* Top Header matching diagram */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Faculty Portal • {user.name} ({health.online ? 'FastAPI Connected' : 'Local Fallback'})</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              TEACHER DASHBOARD
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Manage students, review curriculum content, and monitor cohort progress across Anna University 2025 Data Structures topics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              Switch to Student View
            </button>
          </div>
        </div>

        {/* 4 Core Tabs from Diagram: Students, Content, Analytics, Topics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'students'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Students</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'content'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Content</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('topics')}
            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'topics'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Topics</span>
          </button>
        </div>

        {/* TAB 1: STUDENTS */}
        {activeTab === 'students' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Enrolled Students</h3>
                <p className="text-xs text-slate-400">
                  Accounts registered via backend API (POST /auth/register) and system roster
                </p>
              </div>

              {/* Search input */}
              <div className="relative max-w-xs w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  placeholder="Search students..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 -mx-1 sm:mx-0">
              <table className="w-full min-w-[640px] text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Syllabus Progress</th>
                    <th className="py-3 px-4">Test Cases Passed</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                  {filteredStudents.map((s, idx) => (
                    <tr key={s.id || idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-[11px] text-white">
                          {s.name.charAt(0)}
                        </div>
                        <span>{s.name}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{s.email}</td>
                      <td className="py-3.5 px-4 capitalize">{s.role}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 rounded-full" 
                              style={{ width: `${Math.min(100, 40 + (idx * 20))}%` }} 
                            />
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {Math.min(100, 40 + (idx * 20))}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">
                        {3 + (idx % 3)} / 5 Passed
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CONTENT */}
        {activeTab === 'content' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Course Materials & Video Assets</h3>
                <p className="text-xs text-slate-400">
                  Manage syllabus reference notes, video lecture URLs, and coding problem definitions
                </p>
              </div>

              <button 
                onClick={() => alert('New content creation drawer opened')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center space-x-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Material</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DS_TOPICS.map(topic => (
                <div key={topic.id} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-purple-300 font-semibold border border-slate-700">
                      {topic.categoryTitle}
                    </span>
                    <span className="text-xs text-slate-400">
                      {topic.video.duration} video
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base">{topic.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {topic.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-purple-400 font-medium">
                    <span>9/9 Steps Structured</span>
                    <span className="text-slate-400">Unit-1 to 5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="text-xl font-bold text-white">Cohort Performance & Learning Analytics</h3>
              <p className="text-xs text-slate-400">
                Evaluation metrics across tests, test cases, and curriculum completion
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-center">
                <div className="text-xs text-slate-400">Class Average MCQ Score</div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-2">87.5%</div>
                <div className="text-[11px] text-slate-400 mt-1">Across all 5 units</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-center">
                <div className="text-xs text-slate-400">Coding Test Cases Pass Rate</div>
                <div className="text-3xl font-extrabold text-sky-400 mt-2">91.2%</div>
                <div className="text-[11px] text-slate-400 mt-1">Auto-evaluated compiler</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-center">
                <div className="text-xs text-slate-400">C Fundamentals Clearance</div>
                <div className="text-3xl font-extrabold text-purple-400 mt-2">98%</div>
                <div className="text-[11px] text-slate-400 mt-1">Prerequisite completion</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm">Topic Completion Distribution</h4>
              <div className="space-y-3">
                {DS_TOPICS.map((t, idx) => {
                  const passRate = 85 - (idx * 5);
                  return (
                    <div key={t.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">{t.title}</span>
                        <span className="text-slate-400 font-mono">{passRate}% Mastery</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" 
                          style={{ width: `${passRate}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TOPICS */}
        {activeTab === 'topics' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Anna University 2025 Regulation Topics</h3>
                <p className="text-xs text-slate-400">
                  Official syllabus alignment with full 9-step study modules
                </p>
              </div>

              <button 
                onClick={() => alert('New DS syllabus topic added')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center space-x-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Syllabus Unit</span>
              </button>
            </div>

            <div className="divide-y divide-slate-800">
              {DS_TOPICS.map((t, idx) => (
                <div key={t.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-purple-400">Unit 0{idx + 1}:</span>
                      <span className="font-bold text-white text-sm">{t.title}</span>
                      <span className="text-[11px] text-slate-400">({t.subvariety})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">{t.conceptWhat}</p>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      5 MCQs & Coding Problem
                    </span>
                    <button
                      onClick={() => onNavigate('ds-studio')}
                      className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 flex items-center space-x-1"
                    >
                      <span>Preview Studio</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
