import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Cpu, 
  GraduationCap, 
  UserPlus, 
  LogIn, 
  Database,
  ChevronRight,
  Zap
} from 'lucide-react';
import type { BackendHealthStatus, UserProfile } from '../types/lms';
import { TOPIC_STEPS } from '../data/curriculumData';

interface LandingPageProps {
  onLoginSuccess?: (user: UserProfile) => void;
  health: BackendHealthStatus;
  onNavigate?: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ health, onNavigate }) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'track' | 'curriculum' | 'antiskip' | 'portals'>('track');

  const handleGoToRegister = () => {
    if (onNavigate) {
      onNavigate('register');
    } else {
      window.location.hash = '#register';
    }
  };

  const handleGoToLogin = () => {
    if (onNavigate) {
      onNavigate('login');
    } else {
      window.location.hash = '#login';
    }
  };

  const scrollToPreview = () => {
    const el = document.getElementById('platform-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col bg-slate-950 text-slate-100 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-10 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 landing-hero-bg">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <span>Anna University 2025 Regulation Curriculum Ready</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Adaptive Learning System for{' '}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Data Structures & C
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Master complex linear and non-linear data structures through sequential 9-step study studios, verified anti-skipping lecture modules, theoretical memory illustrations, and integrated online coding sandboxes.
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2">
            <button
              type="button"
              onClick={handleGoToRegister}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2.5"
            >
              <UserPlus className="w-5 h-5" />
              <span>Register Now — Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleGoToLogin}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm sm:text-base shadow-md transition-all hover:border-slate-600 flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4 text-sky-400" />
              <span>Portal Sign In</span>
            </button>

            <button
              type="button"
              onClick={scrollToPreview}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl text-slate-400 hover:text-sky-300 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1"
            >
              <span>Explore Platform Preview</span>
              <span>↓</span>
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-4 sm:pt-6">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Anna University 2025 Regulation Aligned</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">9 Steps</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Structured Pedagogical Topic Mastery</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">Anti-Skip</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Enforced Sequential Lecture Modules</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">3 Portals</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Student, Faculty & Administrator Views</div>
            </div>
          </div>

          {/* Backend Status indicator */}
          <div className="pt-2">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs border ${
              health.online 
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' 
                : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
            }`}>
              <Database className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                {health.online ? 'FastAPI Microservice Engine Active' : 'Offline Mode: Local Resilient Demo Mock Active'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM PREVIEW SHOWCASE */}
      <section id="platform-preview" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Complete Platform Preview</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Engineered for Authentic Academic Excellence
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Explore the core architectural components of our learning management system designed specifically for Computer Science & IT engineering students.
            </p>
          </div>

          {/* Interactive Preview Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={() => setActivePreviewTab('track')}
              className={`flex-1 min-w-[130px] px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
                activePreviewTab === 'track'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>9-Step Studio</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreviewTab('curriculum')}
              className={`flex-1 min-w-[130px] px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
                activePreviewTab === 'curriculum'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Data Structures</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreviewTab('antiskip')}
              className={`flex-1 min-w-[130px] px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
                activePreviewTab === 'antiskip'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Anti-Skip System</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreviewTab('portals')}
              className={`flex-1 min-w-[130px] px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
                activePreviewTab === 'portals'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Institutional Roles</span>
            </button>
          </div>

          {/* TAB 1: 9-STEP PEDAGOGICAL TRACK */}
          {activePreviewTab === 'track' && (
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Sequential Progression Model</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">The 9-Step Topic Mastery Architecture</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Every data structures topic follows a rigorous 9-step pedagogical sequence ensuring deep comprehension from abstract memory model to verified source code.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGoToRegister}
                  className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 transition-colors flex items-center space-x-1.5"
                >
                  <span>Experience Step Studio</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 9 Steps Grid Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {TOPIC_STEPS.map((step, idx) => (
                  <div 
                    key={step.id} 
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-sky-500/40 transition-all group flex items-start space-x-3.5 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 text-sky-400 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/20 group-hover:text-sky-300 transition-colors">
                      0{idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DATA STRUCTURES CURRICULUM */}
          {activePreviewTab === 'curriculum' && (
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Curriculum Catalog</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Core Modules & Algorithm Tracks</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Comprehensive coverage of Anna University 2025 Regulation Data Structures with Big-O complexity metrics, memory blueprints, and C code sandboxes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGoToRegister}
                  className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 transition-colors flex items-center space-x-1.5"
                >
                  <span>Explore Full Curriculum</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Linked Lists</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Singly, Doubly, and Circular Linked Lists with dynamic node allocation, pointer traversals, and O(1) head manipulations.
                  </p>
                  <div className="text-[11px] font-mono text-sky-300 font-medium">O(1) insert • O(n) search</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Stacks & Queues</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    LIFO and FIFO implementations using contiguous arrays and dynamic linked lists. Expression conversion and circular buffers.
                  </p>
                  <div className="text-[11px] font-mono text-indigo-300 font-medium">O(1) push/pop/enqueue</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Trees & BSTs</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Binary Search Trees, self-balancing AVL Trees with rotation mechanics, Min/Max Heaps, and expression tree evaluations.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-300 font-medium">O(log n) balanced search</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Graphs & Algorithms</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Adjacency lists and matrices, Breadth-First & Depth-First Traversals, Dijkstra's shortest path, Prim's and Kruskal's MST.
                  </p>
                  <div className="text-[11px] font-mono text-purple-300 font-medium">O(V + E) traversals</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ANTI-SKIP ENFORCEMENT PREVIEW */}
          {activePreviewTab === 'antiskip' && (
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Academic Integrity System</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Anti-Skip Video Lecture Enforcement</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Unlike standard video platforms, students cannot fast-forward or jump past concepts. Step 3 (Materials) and subsequent coding challenges stay locked until lectures are genuinely completed.
                  </p>
                </div>
                <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Strict Compliance Mode
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Locked Downstream Steps</h4>
                  <p className="text-xs text-slate-400">
                    Steps 3 to 9 display lock icons. Clicking on them alerts the student that the explanation video must be completed first.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Active Scrubber Reversion</h4>
                  <p className="text-xs text-slate-400">
                    If scrubbing ahead is attempted, the player snaps back to the maximum verified watched second and prompts an advisory warning.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Faculty Preview Bypass</h4>
                  <p className="text-xs text-slate-400">
                    Authorized professors and administrators have a single-click preview unlock button to evaluate all materials seamlessly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INSTITUTIONAL ROLES */}
          {activePreviewTab === 'portals' && (
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Multi-Role Architecture</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Dedicated Portals for Every Stakeholder</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Tailored dashboards providing students with sequential mastery, faculty with classroom analytics, and administrators with governance controls.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Student Dashboard</h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Sequential prerequisite topic unlocking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Individual competency percentage & stats</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Integrated web IDE with unit test validation</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Faculty Portal</h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Classroom cohort analytics & diagnostic heatmaps</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Real-time lecture watch time completion logs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Assessment question review & student breakdowns</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Admin Console</h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Institutional student & staff roster management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>FastAPI backend health & audit logging</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Course configuration & curriculum sync</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. "HOW IT WORKS" WALKTHROUGH */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Pedagogical Workflow</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">How Students Learn in Adaptive LMS</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="text-3xl font-extrabold font-mono text-sky-400/40 mb-2">01</div>
              <h4 className="text-base font-bold text-white mb-1.5">Enroll & Register</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Create an institutional student profile with your department and register number to establish your personalized tracking ledger.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="text-3xl font-extrabold font-mono text-indigo-400/40 mb-2">02</div>
              <h4 className="text-base font-bold text-white mb-1.5">Watch Explanations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experience high-yield video lectures without skipping ahead. Complete the video requirement to automatically unlock reference notes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="text-3xl font-extrabold font-mono text-emerald-400/40 mb-2">03</div>
              <h4 className="text-base font-bold text-white mb-1.5">Validate Knowledge</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review theoretical memory layouts, study Anna University core reference bullet sheets, and solve instant diagnostic MCQs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="text-3xl font-extrabold font-mono text-purple-400/40 mb-2">04</div>
              <h4 className="text-base font-bold text-white mb-1.5">Write & Test Code</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Implement algorithms directly in C inside our web editor. Run automated test cases to certify topic completion and advance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROMINENT BOTTOM REGISTRATION SECTION */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/40 shadow-2xl backdrop-blur-xl text-center space-y-6 relative overflow-hidden">
            
            {/* Background Glow Effect */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Institutional Onboarding</span>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to Master Data Structures & Ace University Examinations?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Join our department learning track today. Register your student or faculty account to access all 9-step study studios, anti-skip lecture modules, diagnostic question banks, and live C coding environments.
              </p>
            </div>

            {/* THE PROMINENT REGISTRATION BUTTON */}
            <div className="pt-2 flex flex-col items-center justify-center space-y-4 relative z-10">
              <button
                type="button"
                id="landing-register-cta-btn"
                onClick={handleGoToRegister}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 group"
              >
                <UserPlus className="w-5 h-5 text-sky-200 group-hover:scale-110 transition-transform" />
                <span>Register Now — Create Account</span>
                <ArrowRight className="w-5 h-5 text-sky-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>Already registered?</span>
                <button
                  type="button"
                  onClick={handleGoToLogin}
                  className="text-sky-400 hover:text-sky-300 font-bold underline transition-colors"
                >
                  Sign In to Your Account
                </button>
              </div>
            </div>

            {/* Trust Checklist */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 relative z-10">
              <div className="flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>No Course Fees Required</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Anna University Regulation Aligned</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Instant Account Activation</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800/80 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-400">Adaptive LMS • Department of Computer Science & Engineering</span>
          </div>
          <div>
            Anna University 2025 Regulation Standard • Centralized Academic Platform
          </div>
        </div>
      </footer>

    </div>
  );
};
