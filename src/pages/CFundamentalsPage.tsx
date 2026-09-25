import React, { useState, useMemo, useEffect } from 'react';
import { 
  Code2, 
  BookOpen, 
  FileCode, 
  Terminal, 
  Play, 
  SkipForward, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Search,
  Menu,
  X,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Copy
} from 'lucide-react';
import type { UserProgress } from '../types/lms';
import { C_CATEGORIES, C_TUTORIAL_LESSONS } from '../data/cTutorialData';
import { apiService } from '../services/api';

interface CFundamentalsPageProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (page: string) => void;
  onGoBack?: () => void;
}

export const CFundamentalsPage: React.FC<CFundamentalsPageProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
  onGoBack
}) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'concepts' | 'syntax' | 'examples' | 'code' | 'exercise'>('concepts');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Expanded categories state - all expanded by default
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    C_CATEGORIES.forEach(cat => {
      initial[cat.id] = true;
    });
    return initial;
  });

  const lesson = C_TUTORIAL_LESSONS[currentLessonIndex] || C_TUTORIAL_LESSONS[0];
  
  // Interactive code editor state
  const [editableCode, setEditableCode] = useState(lesson.sampleCode);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Sync editor when lesson index changes
  useEffect(() => {
    setEditableCode(lesson.sampleCode);
    setConsoleOutput(null);
    setShowHint(false);
    setShowSolution(false);
  }, [currentLessonIndex, lesson.sampleCode]);

  // Group lessons by category
  const lessonsByCategory = useMemo(() => {
    const map = new Map<string, typeof C_TUTORIAL_LESSONS>();
    C_CATEGORIES.forEach(cat => {
      map.set(cat.id, []);
    });
    
    C_TUTORIAL_LESSONS.forEach(item => {
      const catKey = item.category || 'tutorial';
      const list = map.get(catKey) || [];
      list.push(item);
      map.set(catKey, list);
    });

    return map;
  }, []);

  // Filtered lessons based on search query
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return C_TUTORIAL_LESSONS.filter(l => 
      l.title.toLowerCase().includes(q) || 
      (l.categoryTitle && l.categoryTitle.toLowerCase().includes(q)) ||
      l.concepts.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleSelectLessonById = (lessonId: string) => {
    const idx = C_TUTORIAL_LESSONS.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      setCurrentLessonIndex(idx);
      setMobileSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markLessonComplete = (lessonId: string) => {
    if (!progress.completedCFundamentalLessonIds.includes(lessonId)) {
      const updatedList = [...progress.completedCFundamentalLessonIds, lessonId];
      const allDone = updatedList.length === C_TUTORIAL_LESSONS.length;
      const updatedProgress: UserProgress = {
        ...progress,
        completedCFundamentalLessonIds: updatedList,
        cFundamentalsCompleted: allDone || progress.cFundamentalsCompleted
      };
      onUpdateProgress(updatedProgress);
      apiService.saveProgress(updatedProgress);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('Compiling with gcc 14.2 (gcc -Wall -O2 -std=c99 main.c -o main)...\nLinking standard libraries...\nExecuting binary...\n\n');
    setTimeout(() => {
      setConsoleOutput(
        `[Program Terminated - Exit Status: 0]\n=====================================\n${lesson.expectedOutput}`
      );
      setIsRunning(false);
      markLessonComplete(lesson.id);
    }, 600);
  };

  const handleNextLesson = () => {
    markLessonComplete(lesson.id);
    if (currentLessonIndex < C_TUTORIAL_LESSONS.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const updatedProgress: UserProgress = {
        ...progress,
        cFundamentalsCompleted: true,
        completedCFundamentalLessonIds: C_TUTORIAL_LESSONS.map(l => l.id)
      };
      onUpdateProgress(updatedProgress);
      apiService.saveProgress(updatedProgress);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isCurrentLessonDone = progress.completedCFundamentalLessonIds.includes(lesson.id);
  const completedCount = progress.completedCFundamentalLessonIds.length;
  const progressPercent = Math.min(100, Math.round((completedCount / C_TUTORIAL_LESSONS.length) * 100));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-30 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onGoBack ? onGoBack() : onNavigate('student-dashboard')}
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
                  <span>C Tutorial & Concepts</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    No Videos • Interactive Code
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Progress and Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-3 text-xs bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Progress:</span>
              <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-semibold text-emerald-400 font-mono">
                {completedCount}/{C_TUTORIAL_LESSONS.length} ({progressPercent}%)
              </span>
            </div>

            <button
              onClick={() => onNavigate('ds-hub')}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 transition-colors"
            >
              <span>Data Structures Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 text-xs font-semibold"
            >
              {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>Topics</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
        
        {/* SIDEBAR: Matching Tutorial Navigation Hierarchy */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-72 sm:w-80 bg-slate-900/95 lg:bg-slate-900/60
            border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out
            lg:translate-x-0 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            mt-14 lg:mt-0 h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem)]
          `}
        >
          {/* Search Box */}
          <div className="p-3 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search C topics..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Topics List with Custom Scrollbar */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40 text-xs select-none">
            {filteredLessons ? (
              // Search Results View
              <div className="p-2 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Search Results ({filteredLessons.length})
                </div>
                {filteredLessons.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-xs">
                    No topics found matching "{searchQuery}"
                  </div>
                ) : (
                  filteredLessons.map((item) => {
                    const isCurrent = item.id === lesson.id;
                    const isDone = progress.completedCFundamentalLessonIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectLessonById(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                          isCurrent
                            ? 'bg-sky-500/20 text-sky-300 font-semibold border-l-4 border-sky-400 pl-2'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-2" />}
                      </button>
                    );
                  })
                )}
              </div>
            ) : (
              // Standard Hierarchical Accordion View (Matching Screenshot Design)
              C_CATEGORIES.map((cat) => {
                const categoryLessons = lessonsByCategory.get(cat.id) || [];
                const isExpanded = expandedCategories[cat.id] ?? true;
                const completedInCat = categoryLessons.filter(l => progress.completedCFundamentalLessonIds.includes(l.id)).length;

                return (
                  <div key={cat.id} className="py-1">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full px-4 py-2 flex items-center justify-between text-left text-slate-400 hover:text-slate-200 transition-colors group"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-bold tracking-wider text-[11px] text-slate-400 group-hover:text-slate-300 uppercase">
                          {cat.title}
                        </span>
                        {completedInCat === categoryLessons.length && categoryLessons.length > 0 && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] text-slate-500 font-mono">
                          {completedInCat}/{categoryLessons.length}
                        </span>
                        <ChevronDown 
                          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Category Items */}
                    {isExpanded && (
                      <div className="space-y-0.5 px-2 pb-1">
                        {categoryLessons.map((item) => {
                          const isCurrent = item.id === lesson.id;
                          const isDone = progress.completedCFundamentalLessonIds.includes(item.id);

                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelectLessonById(item.id)}
                              className={`
                                w-full text-left px-3 py-1.5 rounded-md flex items-center justify-between transition-all text-xs
                                ${isCurrent 
                                  ? 'bg-slate-800 text-emerald-400 font-bold border-l-4 border-emerald-500 shadow-sm pl-2.5' 
                                  : isDone
                                  ? 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                                }
                              `}
                            >
                              <span className="truncate">{item.title}</span>
                              {isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-1.5" />
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar Footer info */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/90 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Anna University 2025</span>
            <span className="font-mono">76 Concepts</span>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* MAIN CONTENT PANE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-sky-400 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 uppercase tracking-wider font-mono text-[10px]">
                    {lesson.categoryTitle}
                  </span>
                  <span>•</span>
                  <span>Topic #{lesson.order} of {C_TUTORIAL_LESSONS.length}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {lesson.title}
                </h2>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => markLessonComplete(lesson.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                    isCurrentLessonDone
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentLessonDone ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{isCurrentLessonDone ? 'Completed' : 'Mark as Done'}</span>
                </button>

                <div className="flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentLessonIndex === 0}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Previous Topic"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 px-2">
                    {currentLessonIndex + 1}/{C_TUTORIAL_LESSONS.length}
                  </span>
                  <button
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex === C_TUTORIAL_LESSONS.length - 1}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Next Topic"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Navigation Tabs */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800 pt-4">
              <button
                onClick={() => setActiveTab('concepts')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  activeTab === 'concepts'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm'
                    : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>1. Concepts</span>
              </button>

              <button
                onClick={() => setActiveTab('syntax')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  activeTab === 'syntax'
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                    : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>2. Syntax</span>
              </button>

              <button
                onClick={() => setActiveTab('examples')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  activeTab === 'examples'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm'
                    : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3. Examples</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  activeTab === 'code'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                    : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>4. GCC Playground</span>
              </button>

              {lesson.exercise && (
                <button
                  onClick={() => setActiveTab('exercise')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    activeTab === 'exercise'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>5. Practice Exercise</span>
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: CONCEPTS & THEORY (STRICTLY NO VIDEOS) */}
          {activeTab === 'concepts' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Core Theory & Explanation</span>
                </div>
                
                <div className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 whitespace-pre-line">
                  {lesson.concepts}
                </div>

                {/* Academic & Interview Tip */}
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start space-x-3">
                  <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-indigo-300">Anna University 2025 & Interview Note:</strong>
                    <p className="mt-0.5 text-indigo-200/90 leading-relaxed">
                      Understanding "{lesson.title}" is foundational for Data Structures topics such as memory layout, node chaining, and time/space complexity analysis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Preview Code Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
                    <FileCode className="w-4 h-4 text-sky-400" />
                    <span>Quick Code Illustration</span>
                  </h3>
                  <button
                    onClick={() => {
                      setActiveTab('code');
                      setEditableCode(lesson.sampleCode);
                    }}
                    className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center space-x-1"
                  >
                    <span>Run in GCC Playground</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-sky-300 overflow-x-auto leading-relaxed">
                  <pre>{lesson.syntax}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYNTAX & DECLARATIONS */}
          {activeTab === 'syntax' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                    <FileCode className="w-4 h-4" />
                    <span>Formal C Syntax & Specification</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(lesson.syntax)}
                    className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-4 py-2 text-[11px] font-mono text-slate-400 border-b border-slate-800 flex justify-between">
                    <span>syntax_definition.c</span>
                    <span className="text-slate-500">ISO C Standard</span>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono text-indigo-300 overflow-x-auto leading-relaxed">
                    {lesson.syntax}
                  </pre>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Review the syntax patterns above. Proper identifier naming, type qualification, and semicolon termination are strictly checked during C compilation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ANNOTATED EXAMPLES */}
          {activeTab === 'examples' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>Annotated Working Example</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyCode(lesson.examples)}
                      className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditableCode(lesson.examples);
                        setActiveTab('code');
                      }}
                      className="flex items-center space-x-1 text-xs text-purple-300 bg-purple-500/20 hover:bg-purple-500/30 px-3 py-1 rounded-lg border border-purple-500/30"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Open in Playground</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="bg-slate-800/60 px-4 py-2 text-[11px] font-mono text-slate-400 border-b border-slate-800 flex justify-between">
                    <span>example_implementation.c</span>
                    <span className="text-slate-500">C99 / C11</span>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    {lesson.examples}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GCC PLAYGROUND (INTERACTIVE IN-BROWSER SIMULATION) */}
          {activeTab === 'code' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Terminal className="w-4 h-4" />
                    <span>In-Browser GCC Compiler Sandbox</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Edit code freely, run the compiler, and verify terminal outputs
                  </span>
                </div>

                {/* Editor and Terminal Output Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Editor */}
                  <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col">
                    <div className="bg-slate-800/80 px-4 py-2 text-xs font-mono text-slate-300 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                        <span className="ml-2">main.c</span>
                      </div>
                      <button
                        onClick={() => setEditableCode(lesson.sampleCode)}
                        className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center space-x-1"
                        title="Reset code"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    </div>
                    <textarea
                      value={editableCode}
                      onChange={(e) => setEditableCode(e.target.value)}
                      rows={14}
                      className="w-full p-4 bg-transparent font-mono text-xs text-sky-200 resize-none focus:outline-none focus:ring-0 leading-relaxed font-normal"
                      placeholder="Write your C code here..."
                      spellCheck={false}
                    />
                  </div>

                  {/* Terminal Execution Window */}
                  <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col">
                    <div className="bg-slate-800/80 px-4 py-2 text-xs font-mono text-slate-300 flex items-center justify-between border-b border-slate-800">
                      <span>Standard Output (stdout)</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                        GCC 14.2.0
                      </span>
                    </div>
                    <div className="p-4 font-mono text-xs text-emerald-400 whitespace-pre-wrap overflow-y-auto flex-1 min-h-[220px] bg-slate-950">
                      {consoleOutput ? (
                        consoleOutput
                      ) : (
                        <div className="text-slate-600 italic h-full flex items-center justify-center">
                          Click "Run Code (GCC)" below to execute...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Execution Controls */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>{isRunning ? 'Compiling with GCC...' : 'Run Code (GCC)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        markLessonComplete(lesson.id);
                        handleNextLesson();
                      }}
                      className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center space-x-1.5 transition-colors border border-slate-700"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      <span>Skip & Next</span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-500">
                    Expected output: <code className="text-slate-400 font-mono">{lesson.expectedOutput.split('\n')[0]}</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PRACTICE EXERCISE (IF AVAILABLE) */}
          {activeTab === 'exercise' && lesson.exercise && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Practice Problem & Exercise</span>
                </div>

                {/* Question */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-white">Challenge Question:</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lesson.exercise.question}
                  </p>
                </div>

                {/* Hints and Solution Accordion */}
                <div className="space-y-3">
                  {lesson.exercise.hint && (
                    <div className="rounded-xl border border-slate-800 overflow-hidden">
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="w-full px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800 text-left text-xs font-semibold text-amber-300 flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center space-x-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Need a Hint?</span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showHint ? 'rotate-180' : ''}`} />
                      </button>
                      {showHint && (
                        <div className="p-4 bg-slate-950 text-xs text-slate-300 leading-relaxed border-t border-slate-800">
                          💡 {lesson.exercise.hint}
                        </div>
                      )}
                    </div>
                  )}

                  {lesson.exercise.solution && (
                    <div className="rounded-xl border border-slate-800 overflow-hidden">
                      <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="w-full px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800 text-left text-xs font-semibold text-emerald-300 flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>View Solution / Explanation</span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSolution ? 'rotate-180' : ''}`} />
                      </button>
                      {showSolution && (
                        <div className="p-4 bg-slate-950 text-xs font-mono text-emerald-300 leading-relaxed border-t border-slate-800 whitespace-pre-line">
                          {lesson.exercise.solution}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Try Code in Playground button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (lesson.exercise?.starterCode) {
                        setEditableCode(lesson.exercise.starterCode);
                      }
                      setActiveTab('code');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white flex items-center space-x-2 transition-colors shadow-md"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Try Exercise Code in Playground</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM STEPPER FOOTER */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrevLesson}
              disabled={currentLessonIndex === 0}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-800 flex items-center justify-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: {currentLessonIndex > 0 ? C_TUTORIAL_LESSONS[currentLessonIndex - 1].title : 'Start'}</span>
            </button>

            <button
              onClick={handleNextLesson}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>
                {currentLessonIndex === C_TUTORIAL_LESSONS.length - 1
                  ? 'Finish C Track & Open DS'
                  : `Next: ${C_TUTORIAL_LESSONS[currentLessonIndex + 1]?.title || 'Next'}`}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};
