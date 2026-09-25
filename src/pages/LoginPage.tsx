import React, { useState, useEffect } from 'react';
import { Sun, Moon, CheckCircle2, AlertCircle } from 'lucide-react';
import type { UserProfile, UserRole } from '../types/lms';
import { apiService } from '../services/api';
import { RegisterComponent } from '../components/RegisterComponent';

export interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate?: (page: string) => void;
  onGoBack?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  initialMode?: 'login' | 'register';
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
  onGoBack,
  theme,
  onToggleTheme,
  initialMode
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as 'student' | 'faculty' | 'admin',
    rememberMe: false
  });

  const [authMode, setAuthMode] = useState<'login' | 'register'>(() => {
    if (initialMode) return initialMode;
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    return hash.includes('register') ? 'register' : 'login';
  });

  useEffect(() => {
    if (initialMode) {
      setAuthMode(initialMode);
    }
  }, [initialMode]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('register')) {
        setAuthMode('register');
      } else if (hash.includes('login')) {
        setAuthMode('login');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (onNavigate) {
      onNavigate('landing');
    } else {
      window.history.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const emailTrimmed = formData.email.trim();
    const passwordTrimmed = formData.password.trim();

    try {
      if (!emailTrimmed) {
        throw new Error('Please enter your email or username');
      }
      if (!passwordTrimmed) {
        throw new Error('Please enter your password');
      }

      const formattedEmail = emailTrimmed.includes('@')
        ? emailTrimmed.toLowerCase()
        : `${emailTrimmed.toLowerCase()}@institution.edu`;

        const displayName = emailTrimmed.includes('@')
          ? emailTrimmed.split('@')[0].replace(/[._]/g, ' ')
          : emailTrimmed;

        const capitalizedName = displayName
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        const mappedRole: UserRole = formData.role === 'admin' 
          ? 'admin' 
          : formData.role === 'faculty' ? 'teacher' : 'student';

        const profile: UserProfile = {
          id: formData.role === 'admin' ? 999 : Date.now(),
          name: formData.role === 'admin'
            ? 'System Administrator'
            : (formData.role === 'student' ? (capitalizedName || 'Ananya Sharma') : 'Dr. R. Ramanathan'),
          email: formattedEmail,
          role: mappedRole
        };

        apiService.saveUser(profile);
        setSuccessMsg(`Signing in as ${profile.name} (${formData.role})...`);
        setTimeout(() => onLoginSuccess(profile), 400);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Authentication error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: 'student' | 'faculty' | 'admin') => {
    const demoUser: UserProfile = role === 'student'
      ? { id: 101, name: 'Ananya Sharma', email: 'ananya.s@institution.edu', role: 'student' }
      : role === 'faculty'
      ? { id: 901, name: 'Dr. R. Ramanathan', email: 'ramanathan@institution.edu', role: 'teacher' }
      : { id: 999, name: 'System Administrator', email: 'admin@institution.edu', role: 'admin' };

    apiService.saveUser(demoUser);
    onLoginSuccess(demoUser);
  };

  if (authMode === 'register') {
    return (
      <div className="login-container">
        {/* Data Structures / C Programming background decoration */}
        <div className="login-bg-decor" aria-hidden="true">
          <span className="login-bg-symbol sym-1">struct Node*</span>
          <span className="login-bg-symbol sym-2">O(log n)</span>
          <span className="login-bg-symbol sym-3">root-&gt;next</span>
          <span className="login-bg-symbol sym-4">malloc(sizeof(Node))</span>
        </div>

        <RegisterComponent
          onSuccess={onLoginSuccess}
          onSwitchToLogin={() => {
            setAuthMode('login');
            window.location.hash = '#login';
          }}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      </div>
    );
  }

  return (
    <div className="login-container">
      {/* Data Structures / C Programming background decoration */}
      <div className="login-bg-decor" aria-hidden="true">
        <span className="login-bg-symbol sym-1">struct Node*</span>
        <span className="login-bg-symbol sym-2">O(log n)</span>
        <span className="login-bg-symbol sym-3">root-&gt;next</span>
        <span className="login-bg-symbol sym-4">malloc(sizeof(Node))</span>
      </div>

      {/* Main Login Card matching https://adaptive-linear-algebra-lms.vercel.app/#login */}
      <div className="login-card">
        {/* Top Bar with Back and Theme Toggle */}
        <div className="login-top-bar">
          <button
            type="button"
            className="login-back-home"
            onClick={handleBack}
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>
        </div>

        {/* Institution Emblem */}
        <div className="logo" aria-hidden="true">
          🏛️
        </div>

        {/* Header and Subtitle */}
        <h1>Learning Management System</h1>
        <p className="subtitle">Learn • Practice • Succeed</p>

        {/* Status Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Form */}
        <form className="login-form" onSubmit={handleSubmit}>

          {/* Email / Username field */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email / Username
            </label>
            <input
              id="login-email"
              type="text"
              name="email"
              placeholder="e.g. username or user@institution.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password field with Show/Hide toggle */}
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <div className="password-box">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Login As selector */}
          <div className="form-group">
            <label htmlFor="login-role" className="form-label">
              Login As
            </label>
            <select
              id="login-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="login-options">
            <label className="remember-label" htmlFor="remember-me">
              <input
                id="remember-me"
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <a
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset instructions will be sent to your registered institutional email.');
              }}
              className="forgot-link"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Signing in...' : 'Sign In to Portal'}
          </button>
        </form>

        {/* Register Link */}
        <p className="register-text">
          New student or faculty?{' '}
          <a
            href="#register"
            className="register-link"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#register';
              setAuthMode('register');
              setErrorMsg(null);
            }}
          >
            Register here
          </a>
        </p>

        {/* Back Link */}
        <div className="back-home-container">
          <a
            href="#back"
            className="back-home-link"
            onClick={(e) => {
              e.preventDefault();
              handleBack();
            }}
          >
            ← Back to Previous Page
          </a>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
          <span className="text-[11px] text-slate-400 font-medium">Quick Demo Access:</span>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-medium border border-slate-700/80 transition-colors shadow-sm"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('faculty')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-400 font-medium border border-slate-700/80 transition-colors shadow-sm"
            >
              Demo Faculty
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold border border-amber-500/30 hover:border-amber-500/50 transition-colors shadow-sm"
            >
              Demo Admin (Full Access)
            </button>
          </div>
          {formData.role === 'admin' && (
            <p className="mt-2 text-[11px] text-amber-400/90 font-medium bg-amber-500/10 py-1 px-2 rounded-lg border border-amber-500/20 inline-block">
              Admin Credentials: <code className="text-white">admin@institution.edu</code> / <code className="text-white">admin123</code>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
