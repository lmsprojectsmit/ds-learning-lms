import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoginComponent } from './components/LoginComponent';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { CFundamentalsPage } from './pages/CFundamentalsPage';
import { DataStructuresHub } from './pages/DataStructuresHub';
import { TopicStudyStudio } from './pages/TopicStudyStudio';
import { ProgressHistoryPage } from './pages/ProgressHistoryPage';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import type { BackendHealthStatus, UserProfile, UserProgress } from './types/lms';
import { apiService } from './services/api';

import type { LMSHistoryState } from './services/router';
import { parseLocation, getHashForPage, getDefaultPreviousPage } from './services/router';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => apiService.getStoredUser());
  const [progress, setProgress] = useState<UserProgress>(() => apiService.getStoredProgress());
  
  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    const parsed = parseLocation();
    return parsed?.topicId || 'singly-linked-list';
  });

  const [currentPage, setCurrentPage] = useState<string>(() => {
    const parsed = parseLocation();
    if (parsed?.page) return parsed.page;
    if (window.location.hash === '#login' || window.location.hash === '#register') return 'login';
    const user = apiService.getStoredUser();
    if (!user) return 'landing';
    if (user.role === 'admin') return 'admin-dashboard';
    return user.role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard';
  });

  const [historyStep, setHistoryStep] = useState<number>(() => {
    const state = typeof window !== 'undefined' ? (window.history.state as LMSHistoryState | null) : null;
    return state?.step ?? 0;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('adaptive_lms_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('adaptive_lms_theme', next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      document.body.style.backgroundColor = '#020617';
      document.body.style.color = '#f8fafc';
    }
  }, [theme]);

  // Backend Health state
  const [backendHealth, setBackendHealth] = useState<BackendHealthStatus>({
    online: false,
    message: 'Checking connection...'
  });

  const checkHealth = async () => {
    const status = await apiService.checkBackendHealth();
    setBackendHealth(status);
  };

  useEffect(() => {
    let isMounted = true;
    apiService.checkBackendHealth().then((status) => {
      if (isMounted) setBackendHealth(status);
    });

    const interval = setInterval(() => {
      apiService.checkBackendHealth().then((status) => {
        if (isMounted) setBackendHealth(status);
      });
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Browser History & Popstate integration
  useEffect(() => {
    const parsed = parseLocation();
    const resolvedPage = parsed?.page || currentPage;
    const resolvedTopicId = parsed?.topicId || selectedTopicId;

    const rootPage = currentUser 
      ? (currentUser.role === 'admin' ? 'admin-dashboard' : currentUser.role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard')
      : 'landing';

    const currentState = window.history.state as LMSHistoryState | null;

    if (!currentState || !currentState.lms) {
      // If user directly landed on a sub-page (e.g. topic studio, c fundamentals, or login),
      // we prime the history so pressing the Back button goes to their home dashboard/landing
      // instead of exiting or closing the website!
      if (resolvedPage !== rootPage && resolvedPage !== 'landing') {
        window.history.replaceState(
          { lms: true, page: rootPage, step: 0 } satisfies LMSHistoryState,
          '',
          getHashForPage(rootPage)
        );
        window.history.pushState(
          { lms: true, page: resolvedPage, topicId: resolvedTopicId, step: 1 } satisfies LMSHistoryState,
          '',
          getHashForPage(resolvedPage, resolvedTopicId)
        );
        setHistoryStep(1);
      } else {
        window.history.replaceState(
          { lms: true, page: resolvedPage, topicId: resolvedTopicId, step: 0 } satisfies LMSHistoryState,
          '',
          getHashForPage(resolvedPage, resolvedTopicId)
        );
        setHistoryStep(0);
      }
    } else {
      setHistoryStep(currentState.step ?? 0);
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as LMSHistoryState | null;
      if (state && state.lms && state.page) {
        setCurrentPage(state.page);
        if (state.topicId) {
          setSelectedTopicId(state.topicId);
        }
        setHistoryStep(state.step ?? 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Fallback: check location hash
      const fallbackParsed = parseLocation();
      if (fallbackParsed && fallbackParsed.page) {
        setCurrentPage(fallbackParsed.page);
        if (fallbackParsed.topicId) {
          setSelectedTopicId(fallbackParsed.topicId);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: string, topicId?: string) => {
    if (page === currentPage && (!topicId || topicId === selectedTopicId)) {
      return;
    }

    const nextTopicId = topicId || (page === 'ds-studio' ? selectedTopicId : undefined);
    const prevStep = (window.history.state as LMSHistoryState | null)?.step ?? historyStep;
    const nextStep = prevStep + 1;
    const hash = getHashForPage(page, nextTopicId);

    window.history.pushState(
      { lms: true, page, topicId: nextTopicId, step: nextStep } satisfies LMSHistoryState,
      '',
      hash
    );

    setCurrentPage(page);
    if (nextTopicId) {
      setSelectedTopicId(nextTopicId);
    }
    setHistoryStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDSTopic = (topicId: string) => {
    handleNavigate('ds-studio', topicId);
  };

  const handleGoBack = () => {
    const currentState = window.history.state as LMSHistoryState | null;
    if (currentState && typeof currentState.step === 'number' && currentState.step > 0) {
      window.history.back();
    } else {
      // Safe fallback navigation: NEVER close the tab or window!
      const fallback = getDefaultPreviousPage(currentPage, currentUser);
      handleNavigate(fallback);
    }
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    const targetPage = user.role === 'admin' ? 'admin-dashboard' : user.role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard';
    window.history.replaceState(
      { lms: true, page: targetPage, step: 0 } satisfies LMSHistoryState,
      '',
      getHashForPage(targetPage)
    );
    setCurrentPage(targetPage);
    setHistoryStep(0);
  };

  const handleLogout = () => {
    apiService.saveUser(null);
    setCurrentUser(null);
    window.history.replaceState(
      { lms: true, page: 'landing', step: 0 } satisfies LMSHistoryState,
      '',
      getHashForPage('landing')
    );
    setCurrentPage('landing');
    setHistoryStep(0);
  };

  const homePage = currentUser
    ? (currentUser.role === 'admin' ? 'admin-dashboard' : currentUser.role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard')
    : 'landing';

  const canGoBack = historyStep > 0 || currentPage !== homePage;

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === 'light' ? 'light-theme bg-slate-50 text-slate-900' : 'dark-theme bg-slate-950 text-slate-100'
      }`} 
      data-theme={theme}
    >
      {/* Top Navigation - shown when not on standalone login page */}
      {currentPage !== 'login' && (
        <Navbar
          currentUser={currentUser}
          health={backendHealth}
          onRefreshHealth={checkHealth}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onGoBack={handleGoBack}
          canGoBack={canGoBack}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenLoginModal={() => handleNavigate('login')}
        />
      )}

      {/* Main Page Router */}
      <main className="flex-1">
        {(currentPage === 'login' || currentPage === 'register') && (
          <LoginPage
            initialMode={currentPage === 'register' ? 'register' : 'login'}
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {currentPage === 'landing' && (
          <LandingPage
            onLoginSuccess={handleLoginSuccess}
            health={backendHealth}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'student-dashboard' && currentUser && (
          <StudentDashboard
            user={currentUser}
            progress={progress}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
          />
        )}

        {currentPage === 'c-fundamentals' && (
          <CFundamentalsPage
            progress={progress}
            onUpdateProgress={setProgress}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
          />
        )}

        {currentPage === 'ds-hub' && (
          <DataStructuresHub
            progress={progress}
            onSelectTopic={handleSelectDSTopic}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
          />
        )}

        {currentPage === 'ds-studio' && (
          <TopicStudyStudio
            topicId={selectedTopicId}
            progress={progress}
            onUpdateProgress={setProgress}
            onNavigate={handleNavigate}
            onSelectTopic={handleSelectDSTopic}
            onGoBack={handleGoBack}
            user={currentUser}
          />
        )}

        {currentPage === 'progress-history' && currentUser && (
          <ProgressHistoryPage
            user={currentUser}
            progress={progress}
            onNavigate={handleNavigate}
            onSelectTopic={handleSelectDSTopic}
            onGoBack={handleGoBack}
          />
        )}

        {currentPage === 'teacher-dashboard' && currentUser && (
          <TeacherDashboard
            user={currentUser}
            health={backendHealth}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
          />
        )}

        {currentPage === 'admin-dashboard' && currentUser && currentUser.role === 'admin' && (
          <AdminDashboard
            user={currentUser}
            health={backendHealth}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
          />
        )}
      </main>

      {/* Global Login Modal */}
      {isLoginModalOpen && (
        <LoginComponent
          isModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={(user) => {
            setIsLoginModalOpen(false);
            handleLoginSuccess(user);
          }}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
}

export default App;
