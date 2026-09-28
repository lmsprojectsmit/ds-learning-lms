import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Cpu, 
  GraduationCap, 
  UserPlus, 
  LogIn, 
  Database,
  ChevronRight
} from 'lucide-react';
import type { BackendHealthStatus, UserProfile } from '../types/lms';

interface LandingPageProps {
  onLoginSuccess?: (user: UserProfile) => void;
  health: BackendHealthStatus;
  onNavigate?: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ health, onNavigate }) => {

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
            <span>Comprehensive Computer Science Curriculum</span>
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
              className="w-full sm:w-auto px-4 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
            >
              <UserPlus className="w-5 h-5 shrink-0" />
              <span>Register Now — Get Started</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={handleGoToLogin}
              className="w-full sm:w-auto px-4 sm:px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm sm:text-base shadow-md transition-all hover:border-slate-600 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-sky-400 shrink-0" />
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

          {/* DATA STRUCTURES CURRICULUM */}
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Curriculum Catalog</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Core Modules & Algorithm Tracks</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Comprehensive coverage of foundational and advanced Data Structures with Big-O complexity metrics, memory blueprints, and C code sandboxes.
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
                Review theoretical memory layouts, study core reference bullet sheets, and solve instant diagnostic MCQs.
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
          <div className="p-5 sm:p-10 lg:p-14 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/40 shadow-2xl backdrop-blur-xl text-center space-y-6 relative overflow-hidden">
            
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
            <div className="pt-2 flex flex-col items-center justify-center space-y-4 relative z-10 w-full">
              <button
                type="button"
                id="landing-register-cta-btn"
                onClick={handleGoToRegister}
                className="w-full sm:w-auto px-4 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base md:text-lg shadow-2xl shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 sm:gap-3 group"
              >
                <UserPlus className="w-5 h-5 text-sky-200 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-center">Register Now — Create Account</span>
                <ArrowRight className="w-5 h-5 text-sky-200 shrink-0 group-hover:translate-x-1 transition-transform" />
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
                <span>Standard Curriculum Aligned</span>
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
            <span className="font-semibold text-slate-400">Adaptive LMS • Department of Information Technology</span>
          </div>
          <div>
            Standard Academic Regulation • Centralized LMS Platform
          </div>
        </div>
      </footer>

    </div>
  );
};
