import React, { useState } from 'react';
import { 
  GraduationCap, 
  Server, 
  User, 
  BookOpen, 
  Code2, 
  BarChart2, 
  LogOut, 
  ShieldCheck,
  RefreshCw,
  LayoutDashboard,
  Sun,
  Moon,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import type { BackendHealthStatus, UserProfile } from '../types/lms';

interface NavbarProps {
  currentUser: UserProfile | null;
  health: BackendHealthStatus;
  onRefreshHealth: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onGoBack?: () => void;
  canGoBack?: boolean;
  onLogout: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenLoginModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  health,
  onRefreshHealth,
  currentPage,
  onNavigate,
  onGoBack,
  canGoBack,
  onLogout,
  theme,
  onToggleTheme,
  onOpenLoginModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg theme-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Optional Back Button + Brand Logo */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 min-w-0 flex-shrink-0">
            {canGoBack && onGoBack && (
              <button
                type="button"
                onClick={onGoBack}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-700/80 shadow-sm transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500/40 flex-shrink-0"
                title="Go back to previous page"
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline font-medium">Back</span>
              </button>
            )}

            <div 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group min-w-0"
              onClick={() => onNavigate(
                currentUser 
                  ? (currentUser.role === 'admin' 
                      ? 'admin-dashboard' 
                      : currentUser.role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard') 
                  : 'landing'
              )}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-lg font-bold tracking-tight bg-gradient-to-r from-white via-sky-100 to-indigo-200 bg-clip-text text-transparent truncate">
                  Adaptive LMS
                </div>
                <div className="text-xs text-sky-400 font-medium tracking-wide hidden sm:block">
                  Learn • Practice • Grow
                </div>
              </div>
            </div>
          </div>

          {/* Center Navigation Links (when logged in) */}
          {currentUser && (
            <nav className="hidden md:flex items-center space-x-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/60">
              {currentUser.role === 'admin' ? (
                <>
                  <button
                    onClick={() => onNavigate('admin-dashboard')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currentPage === 'admin-dashboard'
                        ? 'bg-amber-600 text-white shadow'
                        : 'text-amber-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Console</span>
                  </button>
                  <button
                    onClick={() => onNavigate('student-dashboard')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage === 'student-dashboard'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Student View</span>
                  </button>
                  <button
                    onClick={() => onNavigate('teacher-dashboard')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage === 'teacher-dashboard'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Faculty View</span>
                  </button>
                </>
              ) : currentUser.role === 'student' ? (
                <>
                  <button
                    onClick={() => onNavigate('student-dashboard')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage === 'student-dashboard'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => onNavigate('c-fundamentals')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage === 'c-fundamentals'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>C Fundamentals</span>
                  </button>
                  <button
                    onClick={() => onNavigate('ds-hub')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage.startsWith('ds-')
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Data Structures</span>
                  </button>
                  <button
                    onClick={() => onNavigate('progress-history')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage === 'progress-history'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Progress</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('teacher-dashboard')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Teacher Portal</span>
                </button>
              )}
            </nav>
          )}

          {/* Right Section: Backend Status & User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Live Backend Connection Indicator (compact on mobile) */}
            <div 
              title={health.online ? 'Connected to FastAPI (http://localhost:8000)' : 'Backend offline - Using local resilient mock state'}
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                health.online 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              <Server className="w-3 h-3" />
              <span>
                {health.online ? 'Backend: Online' : 'Backend: Standby'}
              </span>
              <button 
                onClick={onRefreshHealth}
                title="Refresh backend status"
                className="hover:rotate-180 transition-transform duration-500 p-0.5"
              >
                <RefreshCw className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Light / Dark Theme Switcher */}
            <button
              type="button"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shadow-sm flex items-center justify-center theme-toggle-btn flex-shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* User Profile or Login CTA */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/70 px-2.5 py-1 rounded-lg">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase ${
                    currentUser.role === 'admin'
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-600 shadow-sm shadow-amber-500/30'
                      : currentUser.role === 'teacher'
                      ? 'bg-gradient-to-tr from-purple-500 to-indigo-600'
                      : 'bg-gradient-to-tr from-sky-500 to-indigo-600'
                  }`}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold leading-tight text-slate-100 max-w-[120px] truncate">
                      {currentUser.name}
                    </div>
                    <div className={`text-[10px] capitalize font-medium ${
                      currentUser.role === 'admin' ? 'text-amber-400 font-bold' : currentUser.role === 'teacher' ? 'text-purple-400' : 'text-sky-400'
                    }`}>
                      {currentUser.role === 'teacher' ? 'Faculty' : currentUser.role}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Sign out"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:block">
                <button
                  onClick={() => {
                    if (onOpenLoginModal) {
                      onOpenLoginModal();
                    } else {
                      onNavigate('landing');
                    }
                  }}
                  className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Portal Login</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button (when logged in) */}
            {currentUser && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && currentUser && (
          <div className="md:hidden py-3 border-t border-slate-800/80 space-y-1 animate-fadeIn">
            {canGoBack && onGoBack && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoBack();
                }}
                className="w-full flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-sky-300 bg-slate-800/90 hover:bg-slate-700 mb-2 border border-slate-700/80"
              >
                <ArrowLeft className="w-4 h-4 text-sky-400" />
                <span>← Back to Previous Page</span>
              </button>
            )}
            {currentUser.role === 'student' ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('student-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    currentPage === 'student-dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('c-fundamentals');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    currentPage === 'c-fundamentals' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>C Fundamentals</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('ds-hub');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    currentPage.startsWith('ds-') ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Data Structures</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('progress-history');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    currentPage === 'progress-history' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Progress History</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('teacher-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Teacher Portal</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
