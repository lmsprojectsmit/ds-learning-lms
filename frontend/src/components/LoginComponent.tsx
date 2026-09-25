import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import type { UserProfile, UserRole } from '../types/lms';
import { apiService } from '../services/api';
import { RegisterComponent } from './RegisterComponent';

export interface LoginComponentProps {
  onLoginSuccess: (user: UserProfile) => void;
  initialRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  className?: string;
  isModal?: boolean;
  onClose?: () => void;
  onNavigate?: (page: string) => void;
  onGoBack?: () => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = ({
  onLoginSuccess,
  initialRole = 'student',
  onRoleChange,
  className = '',
  isModal = false,
  onClose,
  onNavigate,
  onGoBack
}) => {
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>(
    initialRole === 'teacher' ? 'faculty' : 'student'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setRole(initialRole === 'teacher' ? 'faculty' : 'student');
  }, [initialRole]);

  const handleRoleChange = (newRole: 'student' | 'faculty' | 'admin') => {
    setRole(newRole);
    if (onRoleChange) {
      onRoleChange(newRole === 'faculty' ? 'teacher' : 'student');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    try {
      if (authMode === 'register') {
        if (!fullName.trim()) throw new Error('Please enter your full name');
        if (!emailTrimmed) throw new Error('Please enter your institutional email');
        if (passwordTrimmed.length < 6) throw new Error('Password must be at least 6 characters');

        const formattedEmail = emailTrimmed.includes('@')
          ? emailTrimmed.toLowerCase()
          : `${emailTrimmed.toLowerCase()}@institution.edu`;

        const registered = await apiService.registerUser({
          name: fullName.trim(),
          email: formattedEmail,
          password: passwordTrimmed
        });

        setSuccessMsg(`Welcome, ${registered.name}! Account registered successfully.`);

        const mappedRole: UserRole = role === 'faculty' ? 'teacher' : 'student';
        const profile: UserProfile = {
          id: registered.id,
          name: registered.name,
          email: registered.email,
          role: mappedRole
        };

        apiService.saveUser(profile);
        setTimeout(() => {
          onLoginSuccess(profile);
          if (onClose) onClose();
        }, 500);
      } else {
        if (!emailTrimmed) throw new Error('Please enter your email or username');
        if (!passwordTrimmed) throw new Error('Please enter your password');

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

        const mappedRole: UserRole = role === 'admin'
          ? 'admin'
          : role === 'faculty' ? 'teacher' : 'student';

        const profile: UserProfile = {
          id: role === 'admin' ? 999 : Date.now(),
          name: role === 'admin' 
            ? 'System Administrator'
            : role === 'student' ? (capitalizedName || 'Ananya Sharma') : 'Dr. R. Ramanathan',
          email: formattedEmail,
          role: mappedRole
        };

        apiService.saveUser(profile);
        setSuccessMsg(`Signing in as ${profile.name} (${role})...`);
        setTimeout(() => {
          onLoginSuccess(profile);
          if (onClose) onClose();
        }, 400);
      }
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

  const handleQuickDemo = (demoRole: 'student' | 'faculty' | 'admin') => {
    handleRoleChange(demoRole);

    const demoUser: UserProfile = demoRole === 'student'
      ? { id: 101, name: 'Ananya Sharma', email: 'ananya.s@institution.edu', role: 'student' }
      : demoRole === 'faculty'
      ? { id: 901, name: 'Dr. R. Ramanathan', email: 'ramanathan@institution.edu', role: 'teacher' }
      : { id: 999, name: 'System Administrator', email: 'admin@institution.edu', role: 'admin' };

    apiService.saveUser(demoUser);
    onLoginSuccess(demoUser);
    if (onClose) onClose();
  };

  const cardContent = (
    <div className={`login-card mx-auto ${className}`}>
      {/* Modal Close Button */}
      {isModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 z-10"
          title="Close login modal"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Top Bar for Back button if onNavigate is present */}
      {!isModal && (onNavigate || onGoBack) && (
        <div className="login-top-bar">
          <button
            type="button"
            className="login-back-home"
            onClick={() => onGoBack ? onGoBack() : onNavigate?.('landing')}
          >
            ← Back
          </button>
        </div>
      )}

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

      {/* Form matching https://adaptive-linear-algebra-lms.vercel.app/#login */}
      <form className="login-form" onSubmit={handleSubmit}>
        {authMode === 'register' && (
          <div className="form-group">
            <label htmlFor="card-register-name" className="form-label">
              Full Name
            </label>
            <input
              id="card-register-name"
              type="text"
              name="name"
              placeholder="e.g. Ananya Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email / Username */}
        <div className="form-group">
          <label htmlFor="login-email" className="form-label">
            Email / Username
          </label>
          <input
            id="login-email"
            type="text"
            name="email"
            placeholder="e.g. username or user@institution.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Login As */}
        <div className="form-group">
          <label htmlFor="login-role" className="form-label">
            Login As
          </label>
          <select
            id="login-role"
            name="role"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value as 'student' | 'faculty' | 'admin')}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="login-options">
          <label className="remember-label" htmlFor="card-remember-me">
            <input
              id="card-remember-me"
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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
          {loading ? 'Signing in...' : (authMode === 'register' ? 'Register Account' : 'Sign In to Portal')}
        </button>
      </form>

      {/* Switch mode */}
      <p className="register-text">
        {authMode === 'login' ? (
          <>
            New student or faculty?{' '}
            <a
              href="#register"
              className="register-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('login');
                }
                window.location.hash = '#register';
                setAuthMode('register');
                setErrorMsg(null);
              }}
            >
              Register here
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a
              href="#login"
              className="register-link"
              onClick={(e) => {
                e.preventDefault();
                setAuthMode('login');
                window.location.hash = '#login';
                setErrorMsg(null);
              }}
            >
              Sign in here
            </a>
          </>
        )}
      </p>

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
        {role === 'admin' && (
          <p className="mt-2 text-[11px] text-amber-400/90 font-medium bg-amber-500/10 py-1 px-2 rounded-lg border border-amber-500/20 inline-block">
            Admin Credentials: <code className="text-white">admin@institution.edu</code> / <code className="text-white">admin123</code>
          </p>
        )}
      </div>
    </div>
  );

  if (authMode === 'register') {
    return (
      <RegisterComponent
        onSuccess={onLoginSuccess}
        onSwitchToLogin={() => {
          setAuthMode('login');
          window.location.hash = '#login';
        }}
        isModal={isModal}
        onClose={onClose}
      />
    );
  }

  if (isModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) {
            onClose();
          }
        }}
      >
        <div className="relative w-full max-w-[440px] max-h-[92vh] overflow-y-auto">
          {cardContent}
        </div>
      </div>
    );
  }

  return cardContent;
};
