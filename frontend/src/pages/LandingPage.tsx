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
  LogIn, 
  ChevronRight
} from 'lucide-react';
import type { BackendHealthStatus, UserProfile } from '../types/lms';

interface LandingPageProps {
  currentUser?: UserProfile | null;
  onLoginSuccess?: (user: UserProfile) => void;
  health?: BackendHealthStatus;
  onNavigate?: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ currentUser, onNavigate }) => {

  const handleGoToRegister = () => {
    if (onNavigate) {
      onNavigate('register');
    } else {
      window.location.hash = '#register';
    }
  };

  const handleGoToLogin = () => {
    if (currentUser) {
      const dest = currentUser.role === 'admin' 
        ? 'admin-dashboard' 
        : currentUser.role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard';
      if (onNavigate) {
        onNavigate(dest);
        return;
      }
    }
    if (onNavigate) {
      onNavigate('login');
    } else {
      window.location.hash = '#login';
    }
  };

  return (
    <div className="w-full flex flex-col bg-slate-950 text-slate-100 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Full Viewport Screen Size */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 landing-hero-bg">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-10 my-auto">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <span>Multi-Disciplinary Academic Curriculum & Adaptive Learning</span>
          </div>

          {/* Main Title */}
          <div className="space-y-5 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
              Adaptive Learning{' '}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Management System
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              A centralized university academic ecosystem empowering students and faculty across disciplines. Experience structured sequential study studios with anti-skipping lecture verification, high-yield conceptual revision notes, and instant diagnostic assessments engineered for authentic semester-long curriculum mastery and university exam excellence.
            </p>
          </div>

          {/* Hero Action Buttons - Stacked One Over Another */}
          <div className="flex flex-col items-center justify-center gap-3.5 w-full max-w-xs sm:max-w-sm mx-auto pt-3">
            <button
              type="button"
              onClick={handleGoToRegister}
              className="w-full px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 text-center cursor-pointer group"
            >
              <span className="whitespace-nowrap">Register Now — Get Started</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleGoToLogin}
              className="w-full px-6 py-3.5 sm:py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm sm:text-base shadow-md transition-all hover:border-slate-600 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 text-center cursor-pointer"
            >
              <LogIn className="w-5 h-5 text-sky-400 shrink-0" />
              <span className="whitespace-nowrap">{currentUser ? 'Go to My Dashboard' : 'Portal Sign In'}</span>
            </button>
          </div>

          {/* Subtle Scroll Down Prompt */}
          <div className="pt-6 sm:pt-10 flex flex-col items-center gap-1.5 text-xs text-slate-500 animate-bounce pointer-events-none select-none">
            <span className="font-semibold tracking-widest uppercase text-[10px] text-slate-400">Explore Curriculum Modules</span>
            <span className="text-sm">↓</span>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM PREVIEW SHOWCASE */}
      <section id="platform-preview" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Academic Capabilities</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Engineered for Authentic Academic Excellence
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Explore the core architectural components of our learning management system designed to support students and faculty across all academic courses and departments.
            </p>
          </div>

          {/* MULTI-SUBJECT CURRICULUM CATALOG */}
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Curriculum Catalog</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Core Academic Subjects & Modules</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Comprehensive course management supporting foundational sciences, engineering disciplines, programming tracks, and analytical theory modules.
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
                <h4 className="text-base font-bold text-white">Engineering & Sciences</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Foundational engineering principles, applied sciences, digital concepts, and standardized university syllabi.
                </p>
                <div className="text-[11px] font-mono text-sky-300 font-medium">Core Theory • Structured Units</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Programming & Computing</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hands-on coding tracks, algorithms, computational logic, and integrated browser-based coding studios.
                </p>
                <div className="text-[11px] font-mono text-indigo-300 font-medium">Interactive Labs • Automated Tests</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Mathematics & Analytical Theory</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mathematical formulation, discrete structures, probability, and analytical problem-solving modules.
                </p>
                <div className="text-[11px] font-mono text-emerald-300 font-medium">Step-by-Step Proofs • Practice MCQs</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Specialized & Department Electives</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Advanced departmental subjects, systems courses, project modules, and interdisciplinary technical tracks.
                </p>
                <div className="text-[11px] font-mono text-purple-300 font-medium">Multi-Disciplinary • Self-Paced</div>
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
                Review conceptual blueprints, study high-yield revision bullet sheets, and test understanding with instant diagnostic MCQs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative">
              <div className="text-3xl font-extrabold font-mono text-purple-400/40 mb-2">04</div>
              <h4 className="text-base font-bold text-white mb-1.5">Hands-on Practice</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete practical assignments, solve application exercises, and certify topic mastery with automated evaluations.
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
                Ready to Excel Across All Subjects & Ace University Examinations?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Join our centralized academic platform today. Register your student or faculty account to access adaptive study studios, verified lecture modules, diagnostic question banks, and comprehensive course resources.
              </p>
            </div>

            {/* THE PROMINENT REGISTRATION BUTTON */}
            <div className="pt-2 flex flex-col items-center justify-center space-y-4 relative z-10 w-full">
              <button
                type="button"
                id="landing-register-cta-btn"
                onClick={handleGoToRegister}
                className="inline-flex items-center justify-center gap-3 min-w-[240px] sm:min-w-[260px] px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95 group mx-auto cursor-pointer"
              >
                <span className="font-bold tracking-wide whitespace-nowrap">Register Now</span>
                <ArrowRight className="w-5 h-5 text-sky-100 shrink-0 group-hover:translate-x-1.5 transition-transform" />
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
            <span className="font-semibold text-slate-400">Adaptive LMS • Centralized Academic Platform</span>
          </div>
          <div>
            Standard Academic Regulation • Multi-Subject Learning Platform
          </div>
        </div>
      </footer>

    </div>
  );
};
