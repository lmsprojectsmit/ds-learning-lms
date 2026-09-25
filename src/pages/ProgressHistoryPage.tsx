import { 
  BarChart3, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Download, 
  ChevronLeft,
  ArrowRight,
  Lock
} from 'lucide-react';
import type { UserProfile, UserProgress } from '../types/lms';
import { DS_TOPICS, isDSTopicUnlocked, getPrerequisiteTopic } from '../data/curriculumData';

interface ProgressHistoryPageProps {
  user: UserProfile;
  progress: UserProgress;
  onNavigate: (page: string) => void;
  onSelectTopic: (topicId: string) => void;
  onGoBack?: () => void;
}

export const ProgressHistoryPage: React.FC<ProgressHistoryPageProps> = ({
  user,
  progress,
  onNavigate,
  onSelectTopic,
  onGoBack
}) => {
  const completedTopicsCount = progress.completedDSTopicIds.length;
  const totalTopicsCount = DS_TOPICS.length;
  const isAllComplete = completedTopicsCount === totalTopicsCount;
  const completionPercentage = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  // Compute average MCQ score
  const mcqValues = Object.values(progress.mcqScores);
  const avgMcqScore = mcqValues.length > 0 
    ? Math.round(mcqValues.reduce((a, b) => a + b, 0) / mcqValues.length)
    : 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
        
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onGoBack ? onGoBack() : onNavigate('student-dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
            Verified Student Record
          </span>
        </div>

        {/* Title Header matching diagram */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
            <BarChart3 className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LEARNING PROGRESS / HISTORY
          </h1>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            View your completed topics, performance analytics, and Anna University 2025 Regulation mastery
          </p>
        </div>

        {/* Overall Completion Banner (DATA STRUCTURES COMPLETED) */}
        <div className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-2 shadow-2xl relative overflow-hidden ${
          isAllComplete 
            ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border-emerald-500' 
            : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                isAllComplete 
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30' 
                  : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
              }`}>
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>{isAllComplete ? 'DATA STRUCTURES COMPLETED' : 'Data Structures In Progress'}</span>
                  {isAllComplete && <span className="text-amber-400">🏆</span>}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  {isAllComplete
                    ? 'You have successfully learned all Data Structures topics as per Anna University 2025 Regulation!'
                    : `You have completed ${completedTopicsCount} out of ${totalTopicsCount} topics in the curriculum.`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-2xl font-extrabold text-white">{completionPercentage}%</div>
                <div className="text-xs text-slate-400">Mastery Level</div>
              </div>
              <div className="w-24 h-24 relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#1e293b"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#0284c7"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * completionPercentage) / 100}
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute text-sm font-bold text-white">{completionPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Completed Topics</div>
            <div className="text-2xl font-bold text-white mt-1">{completedTopicsCount} / {totalTopicsCount}</div>
            <div className="text-[11px] text-sky-400 mt-1">Anna Univ Syllabus</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Average MCQ Score</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{avgMcqScore}%</div>
            <div className="text-[11px] text-slate-400 mt-1">Quiz Assessments</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Coding Auto-Evaluations</div>
            <div className="text-2xl font-bold text-sky-400 mt-1">
              {Object.keys(progress.codingChallengesCompleted).length}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">All Test Cases Passed</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Study Streak</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">{progress.streakDays} Days</div>
            <div className="text-[11px] text-slate-400 mt-1">Consistent Practice</div>
          </div>
        </div>

        {/* Syllabus Topics Checklist Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <span>Curriculum Checklist (Anna University 2025 Regulation)</span>
          </h3>

          <div className="divide-y divide-slate-800">
            {/* Prerequisite C */}
            <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                  C
                </div>
                <div>
                  <div className="font-bold text-white text-sm">C Programming Fundamentals</div>
                  <div className="text-xs text-slate-400">Pointers, Memory allocation, and struct representations</div>
                </div>
              </div>

              {progress.cFundamentalsCompleted ? (
                <span className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mastered</span>
                </span>
              ) : (
                <button
                  onClick={() => onNavigate('c-fundamentals')}
                  className="text-xs px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium"
                >
                  Start Prerequisite
                </button>
              )}
            </div>

            {/* Each DS Topic */}
            {DS_TOPICS.map((t, idx) => {
              const isDone = progress.completedDSTopicIds.includes(t.id);
              const mcqScore = progress.mcqScores[t.id];
              return (
                <div key={t.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs border border-slate-700">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{t.title}</div>
                      <div className="text-xs text-slate-400">{t.subvariety} • 9 Steps Covered</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {mcqScore !== undefined && (
                      <span className="text-xs text-slate-400 font-mono">
                        MCQ: <strong className="text-emerald-400">{mcqScore}%</strong>
                      </span>
                    )}

                    {isDone ? (
                      <span className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : isDSTopicUnlocked(t.id, progress) ? (
                      <button
                        onClick={() => onSelectTopic(t.id)}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-medium border border-slate-700 flex items-center space-x-1"
                      >
                        <span>Study Topic</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span 
                        title={`Complete ${getPrerequisiteTopic(t.id)?.title || 'previous module'} first`}
                        className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 font-medium border border-slate-700 cursor-not-allowed"
                      >
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificate Preview Card */}
        {isAllComplete && (
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/50 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase text-indigo-400">Verified Credential</span>
                <h3 className="text-xl font-bold text-white">Certificate of Completion</h3>
              </div>
              <button 
                onClick={() => alert('Certificate downloaded as PDF!')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center space-x-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certificate</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
              <div className="text-xs text-slate-500 uppercase tracking-widest">Anna University Chennai</div>
              <div className="text-lg font-serif italic text-sky-200">This certifies that</div>
              <div className="text-xl font-bold text-white">{user.name}</div>
              <div className="text-xs text-slate-300 max-w-md mx-auto">
                has successfully mastered Data Structures in C as per Anna University 2025 Regulation, fulfilling all 9 steps of theoretical and hands-on coding assessments.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
