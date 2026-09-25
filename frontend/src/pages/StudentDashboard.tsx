import { useState } from 'react';
import { 
  Code2, 
  BarChart3, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Clock, 
  Layers,
  ChevronRight,
  Award,
  Lock,
  BookOpen
} from 'lucide-react';
import type { UserProfile, UserProgress, CustomSubject } from '../types/lms';
import { DS_TOPICS } from '../data/curriculumData';
import { apiService } from '../services/api';

interface StudentDashboardProps {
  user: UserProfile;
  progress: UserProgress;
  onNavigate: (page: string) => void;
  onGoBack?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  progress,
  onNavigate
}) => {
  const [selectedCustomSubject, setSelectedCustomSubject] = useState<CustomSubject | null>(null);
  const customSubjects = apiService.getCustomSubjects();

  const completedTopicsCount = progress.completedDSTopicIds.length;
  const totalTopicsCount = DS_TOPICS.length;
  const dsProgressPct = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Welcome Header */}
        <div className="welcome-banner relative overflow-hidden rounded-3xl border border-slate-800 p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold theme-pill">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Learning Hub</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight welcome-title">
                Welcome back, {user.name} 👋
              </h1>
              <p className="text-slate-300 text-sm sm:text-base welcome-subtitle">
                Continue your learning pathway and master Data Structures in C as per Anna University 2025 Regulation.
              </p>
            </div>

            {/* Quick stats badge group */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
                <div className="flex items-center justify-center text-amber-400 mb-1">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-base sm:text-xl font-bold text-white">{progress.streakDays}d</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Streak</div>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
                <div className="flex items-center justify-center text-sky-400 mb-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-base sm:text-xl font-bold text-white">{completedTopicsCount}/{totalTopicsCount}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">DS Topics</div>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
                <div className="flex items-center justify-center text-emerald-400 mb-1">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-base sm:text-xl font-bold text-white">{progress.hoursSpent}h</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Subject Selection Hub */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Learning Pathways
              </h2>
              <p className="text-xs text-slate-400">
                Directly aligned with your Centralized LMS curriculum flowchart
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Subject 1: C + DATA STRUCTURES (MAIN SYSTEM) */}
            <div 
              onClick={() => onNavigate(progress.cFundamentalsCompleted ? 'ds-hub' : 'c-fundamentals')}
              className="featured-main-card group p-6 rounded-3xl bg-slate-900 border-2 border-sky-500/70 hover:border-sky-400 shadow-2xl transition-all cursor-pointer relative flex flex-col justify-between ring-2 ring-sky-500/20"
            >
              <div className="absolute top-4 right-4">
                <span className="text-xs px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/40 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>Main System</span>
                </span>
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
                  <Code2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                  C + DATA STRUCTURES
                </h3>
                <p className="text-xs font-semibold text-sky-400 mt-1">
                  Learn C and Data Structures
                </p>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Complete prerequisite C Programming fundamentals followed by Linked Lists, Stacks, Queues, Trees, and Graphs as per Anna University 2025 Regulation.
                </p>

                {/* Progress bar inside card */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">DS Syllabus Mastery</span>
                    <span className="text-sky-400 font-bold">{dsProgressPct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-700" 
                      style={{ width: `${dsProgressPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 flex items-center space-x-1">
                  <span>Enter Learning Stream</span>
                </span>
                <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-300 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Admin Created Custom Subjects (if any) */}
            {customSubjects.map((subj) => (
              <div 
                key={subj.id}
                onClick={() => setSelectedCustomSubject(subj)}
                className="group p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer relative flex flex-col justify-between shadow-xl"
              >
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                    {subj.code}
                  </span>
                </div>

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {subj.title}
                  </h3>
                  <p className="text-xs font-medium text-amber-400 mt-1">
                    {subj.department}
                  </p>
                  <p className="text-sm text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                    {subj.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <span>Explore Syllabus ({subj.units.length} Units)</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}

            {/* Subject: Progress & History */}
            <div 
              onClick={() => onNavigate('progress-history')}
              className="group p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all cursor-pointer relative flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Progress
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Analytics
                  </span>
                </div>
                <p className="text-xs font-medium text-emerald-400 mt-1">
                  Track your learning journey
                </p>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  View completed topics, MCQ test scores, test case execution history, and Anna University syllabus completion certificate.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span className="flex items-center space-x-1">
                  <span>View Full Analytics</span>
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>

        {/* Quick Curriculum Stepper Overview */}
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-sky-400" />
            <span>Recommended Learning Sequence</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Follow the systematic Anna University curriculum architecture for maximum retention.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Phase 1 */}
            <div 
              onClick={() => onNavigate('c-fundamentals')}
              className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-sky-500 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-sky-400 mb-2">
                <span>Phase 1</span>
                {progress.cFundamentalsCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">Active</span>
                )}
              </div>
              <div className="font-bold text-sm text-white">C Tutorial & Concepts</div>
              <div className="text-xs text-slate-400 mt-1">76 Topics • Pointers, Memory & GCC Sandbox</div>
            </div>

            {/* Phase 2: Linear */}
            {(() => {
              const isDone = ['singly-linked-list', 'stack-ds', 'queue-ds'].every(id => progress.completedDSTopicIds.includes(id));
              return (
                <div 
                  onClick={() => onNavigate('ds-hub')}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-400 mb-2">
                    <span>Phase 2</span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Linear</span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-white">Linear Structures</div>
                  <div className="text-xs text-slate-400 mt-1">Singly/Doubly Linked Lists, Stacks, Queues</div>
                </div>
              );
            })()}

            {/* Phase 3: Non-Linear */}
            {(() => {
              const isUnlocked = ['singly-linked-list', 'stack-ds', 'queue-ds'].every(id => progress.completedDSTopicIds.includes(id));
              const isDone = ['tree-ds', 'graph-ds'].every(id => progress.completedDSTopicIds.includes(id));
              return (
                <div 
                  onClick={() => onNavigate('ds-hub')}
                  className={`p-4 rounded-2xl bg-slate-800/60 border transition-all cursor-pointer ${
                    !isUnlocked
                      ? 'border-slate-800 opacity-65 hover:border-slate-700'
                      : 'border-slate-700/60 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-purple-400 mb-2">
                    <span>Phase 3</span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : !isUnlocked ? (
                      <span className="flex items-center space-x-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Non-Linear</span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-white">Non-Linear Structures</div>
                  <div className="text-xs text-slate-400 mt-1">Binary Search Trees, AVL Trees, Graphs</div>
                </div>
              );
            })()}

            {/* Phase 4: Mastery */}
            {(() => {
              const isUnlocked = DS_TOPICS.every(t => progress.completedDSTopicIds.includes(t.id));
              return (
                <div 
                  onClick={() => onNavigate('progress-history')}
                  className={`p-4 rounded-2xl bg-slate-800/60 border transition-all cursor-pointer ${
                    !isUnlocked
                      ? 'border-slate-800 opacity-65 hover:border-slate-700'
                      : 'border-slate-700/60 hover:border-emerald-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-2">
                    <span>Phase 4</span>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="flex items-center space-x-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-white">Evaluation & Mastery</div>
                  <div className="text-xs text-slate-400 mt-1">MCQs, Code Auto-Grading & Certificate</div>
                </div>
              );
            })()}
          </div>
        </div>

      </div>

      {/* Modal for Custom Subject Syllabus Details */}
      {selectedCustomSubject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-white">{selectedCustomSubject.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">
                      {selectedCustomSubject.code}
                    </span>
                  </div>
                  <p className="text-xs text-amber-400/90">{selectedCustomSubject.regulation} • {selectedCustomSubject.department}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomSubject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs text-slate-300">
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Course Overview</h4>
                <p className="leading-relaxed text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  {selectedCustomSubject.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-2">Syllabus Units ({selectedCustomSubject.units.length})</h4>
                <div className="space-y-2">
                  {selectedCustomSubject.units.map((unit) => (
                    <div key={unit.unitNumber} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <div className="font-semibold text-white text-xs mb-1">
                        Unit {unit.unitNumber}: {unit.title}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {unit.topics.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300 text-[11px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCustomSubject(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
