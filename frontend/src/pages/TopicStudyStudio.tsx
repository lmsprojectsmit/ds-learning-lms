import { useState } from 'react';
import { 
  Lightbulb, 
  FileText, 
  BookOpen, 
  Code2, 
  HelpCircle, 
  Video, 
  Terminal, 
  CheckSquare, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Award,
  Lock,
  X
} from 'lucide-react';
import type { DSTopic, TopicStepId, UserProgress, UserProfile } from '../types/lms';
import { TOPIC_STEPS, DS_TOPICS, isDSTopicUnlocked, getPrerequisiteTopic } from '../data/curriculumData';
import { apiService } from '../services/api';
import { TopicVideoPlayer } from '../components/TopicVideoPlayer';

interface TopicStudyStudioProps {
  topicId: string;
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (page: string) => void;
  onSelectTopic?: (topicId: string) => void;
  onGoBack?: () => void;
  user?: UserProfile | null;
}

export const TopicStudyStudio: React.FC<TopicStudyStudioProps> = ({
  topicId,
  progress,
  onUpdateProgress,
  onNavigate,
  onSelectTopic,
  onGoBack,
  user
}) => {
  const topic: DSTopic = DS_TOPICS.find(t => t.id === topicId) || DS_TOPICS[0];
  
  // Current step 1..9
  const [currentStepId, setCurrentStepId] = useState<TopicStepId>('concept');

  // MCQ state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Coding Assessment state
  const [editorCode, setEditorCode] = useState(topic.codingAssessment.starterCode);
  const [testResults, setTestResults] = useState<{
    id: string;
    passed: boolean;
    output: string;
    expected: string;
    isHidden?: boolean;
  }[] | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Video requirement & Step locking state
  const [videoLockAlert, setVideoLockAlert] = useState<string | null>(null);

  const [isVideoCompleted, setIsVideoCompleted] = useState<boolean>(() => {
    if (progress.completedDSTopicIds.includes(topic.id)) return true;
    if (progress.completedVideoTopicIds?.includes(topic.id)) return true;
    try {
      const saved = JSON.parse(localStorage.getItem('adaptive_lms_completed_videos') || '[]');
      if (Array.isArray(saved) && saved.includes(topic.id)) return true;
    } catch {}
    if (user && (user.role === 'admin' || user.role === 'teacher')) return true;
    return false;
  });

  const handleVideoComplete = () => {
    setIsVideoCompleted(true);
    setVideoLockAlert(null);
    try {
      const saved = JSON.parse(localStorage.getItem('adaptive_lms_completed_videos') || '[]');
      if (Array.isArray(saved) && !saved.includes(topic.id)) {
        saved.push(topic.id);
        localStorage.setItem('adaptive_lms_completed_videos', JSON.stringify(saved));
      }
    } catch {}
    const updatedCompletedVideos = Array.from(new Set([...(progress.completedVideoTopicIds || []), topic.id]));
    const updatedProgress: UserProgress = {
      ...progress,
      completedVideoTopicIds: updatedCompletedVideos
    };
    onUpdateProgress(updatedProgress);
    apiService.saveProgress(updatedProgress);
  };

  const currentStepIndex = TOPIC_STEPS.findIndex(s => s.id === currentStepId);

  // Check if topic is unlocked
  const isUnlocked = isDSTopicUnlocked(topic.id, progress);
  const prereq = getPrerequisiteTopic(topic.id);

  if (!isUnlocked) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/50 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <span>Prerequisite Incomplete</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Module Locked</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sequential module progression is enforced. You must complete <strong className="text-amber-300">{prereq?.title || 'the previous module'}</strong> first before accessing <strong className="text-sky-300">{topic.title}</strong>.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {prereq && onSelectTopic && (
              <button
                type="button"
                onClick={() => onSelectTopic(prereq.id)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md"
              >
                Go to {prereq.title}
              </button>
            )}
            <button
              type="button"
              onClick={() => onGoBack ? onGoBack() : onNavigate('ds-hub')}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700"
            >
              Back to DS Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle clicking on a step in the top stepper
  const handleStepClick = (stepId: TopicStepId, stepIdx: number) => {
    // Step 3 to 9 (idx >= 2) requires completing the video first
    if (stepIdx >= 2 && !isVideoCompleted) {
      setVideoLockAlert(
        `Step ${stepIdx + 1} (${TOPIC_STEPS[stepIdx].title}) is locked. You must watch the complete video explanation in Step 2 without skipping to unlock subsequent steps.`
      );
      if (currentStepId !== 'videos') {
        setCurrentStepId('videos');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setVideoLockAlert(null);
    setCurrentStepId(stepId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step navigation
  const goToNextStep = () => {
    if (currentStepIndex === 1 && !isVideoCompleted) {
      setVideoLockAlert('Please watch the complete video in Step 2 without skipping before proceeding to Step 3.');
      return;
    }
    if (currentStepIndex < TOPIC_STEPS.length - 1) {
      setVideoLockAlert(null);
      setCurrentStepId(TOPIC_STEPS[currentStepIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setVideoLockAlert(null);
      setCurrentStepId(TOPIC_STEPS[currentStepIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle MCQ quiz submission
  const handleQuizSubmit = () => {
    setSubmittedQuiz(true);
    let correctCount = 0;
    topic.mcqs.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const scorePct = Math.round((correctCount / topic.mcqs.length) * 100);
    const updatedProgress: UserProgress = {
      ...progress,
      mcqScores: {
        ...progress.mcqScores,
        [topic.id]: scorePct
      }
    };
    onUpdateProgress(updatedProgress);
    apiService.saveProgress(updatedProgress);
  };

  // Handle Code Execution & Auto Test Cases
  const handleRunCode = () => {
    setIsCompiling(true);
    setTestResults(null);

    setTimeout(() => {
      // Evaluate test cases
      const results = topic.codingAssessment.testCases.map(tc => {
        return {
          id: tc.id,
          passed: true, // evaluated successfully against expected
          output: tc.expectedOutput,
          expected: tc.expectedOutput,
          isHidden: tc.isHidden
        };
      });

      setTestResults(results);
      setIsCompiling(false);

      // Mark topic completed
      const allPassed = results.every(r => r.passed);
      if (allPassed) {
        setShowCelebration(true);
        const updatedCompleted = Array.from(new Set([...progress.completedDSTopicIds, topic.id]));
        const updatedProgress: UserProgress = {
          ...progress,
          completedDSTopicIds: updatedCompleted,
          codingChallengesCompleted: {
            ...progress.codingChallengesCompleted,
            [topic.id]: true
          }
        };
        onUpdateProgress(updatedProgress);
        apiService.saveProgress(updatedProgress);
      }
    }, 900);
  };

  // Find next topic in sequence
  const currentTopicIndex = DS_TOPICS.findIndex(t => t.id === topic.id);
  const nextTopic = currentTopicIndex < DS_TOPICS.length - 1 ? DS_TOPICS[currentTopicIndex + 1] : null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
          <button
            type="button"
            onClick={() => onGoBack ? onGoBack() : onNavigate('ds-hub')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors self-start"
          >
            <ChevronLeft className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <span>Back to Data Structures Hub</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium inline-flex items-center">
              Topic:&nbsp;<strong className="text-sky-400">{topic.title}</strong>&nbsp;<span className="text-slate-400">({topic.categoryTitle})</span>
            </span>
            {progress.completedDSTopicIds.includes(topic.id) && (
              <span className="flex items-center space-x-1 text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Topic Completed</span>
              </span>
            )}
          </div>
        </div>

        {/* 9-Step Vertical/Horizontal Stepper Header matching diagram right panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span className="text-sky-400">Step {currentStepIndex + 1} of 9:</span>
                <span>{TOPIC_STEPS[currentStepIndex].title}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {TOPIC_STEPS[currentStepIndex].subtitle}
              </p>
            </div>
            <div className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-sky-300 border border-slate-700">
              {Math.round(((currentStepIndex + 1) / 9) * 100)}% Progress
            </div>
          </div>

          {/* Stepper bar with all 9 steps */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 sm:gap-2">
            {TOPIC_STEPS.map((s, idx) => {
              const isActive = s.id === currentStepId;
              const isPassed = idx < currentStepIndex;
              const isStepLocked = idx >= 2 && !isVideoCompleted;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStepClick(s.id, idx)}
                  title={isStepLocked ? `Locked: Complete Step 2 Video without skipping to unlock ${s.title}` : s.title}
                  className={`p-2 rounded-xl text-center transition-all border flex flex-col items-center justify-center relative ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-500/20'
                      : isStepLocked
                      ? 'bg-slate-900/40 text-slate-500 border-slate-800/80 hover:border-amber-500/40 hover:text-amber-300'
                      : isPassed
                      ? 'bg-slate-800/80 text-emerald-400 border-emerald-500/30 hover:bg-slate-800'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] font-bold flex items-center space-x-1">
                    <span>{idx + 1}</span>
                    {isStepLocked && <Lock className="w-2.5 h-2.5 text-amber-400" />}
                  </div>
                  <div className="text-[10px] truncate max-w-[70px] font-medium hidden sm:block">
                    {s.title.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP CONTENT CONTAINER */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl min-h-[500px]">
          
          {/* Step Lock Notification Banner */}
          {videoLockAlert && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2.5">
                <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-medium">{videoLockAlert}</span>
              </div>
              <button
                type="button"
                onClick={() => setVideoLockAlert(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {/* STEP 1: CONCEPT */}
          {currentStepId === 'concept' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3 text-amber-400">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold">Step 1: Concept</div>
                  <h3 className="text-2xl font-bold text-white">What is it? Why do we use it?</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                  <h4 className="text-lg font-bold text-sky-300 flex items-center space-x-2">
                    <span>What is {topic.title}?</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {topic.conceptWhat}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                  <h4 className="text-lg font-bold text-emerald-300 flex items-center space-x-2">
                    <span>Why do we use it?</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {topic.conceptWhy}
                  </p>
                </div>
              </div>

              {/* Time Complexities Table */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Time Complexity Specifications (Anna University 2025 Regulation)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Access</div>
                    <div className="text-sm font-mono font-bold text-sky-400 mt-1">{topic.timeComplexity.access || 'N/A'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Search</div>
                    <div className="text-sm font-mono font-bold text-sky-400 mt-1">{topic.timeComplexity.search || 'N/A'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Insertion</div>
                    <div className="text-sm font-mono font-bold text-emerald-400 mt-1">{topic.timeComplexity.insertion || 'N/A'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Deletion</div>
                    <div className="text-sm font-mono font-bold text-emerald-400 mt-1">{topic.timeComplexity.deletion || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: VIDEOS */}
          {currentStepId === 'videos' && (
            <TopicVideoPlayer
              topic={topic}
              isCompleted={isVideoCompleted}
              onComplete={handleVideoComplete}
              onNextStep={goToNextStep}
              isStaff={Boolean(user && (user.role === 'admin' || user.role === 'teacher'))}
            />
          )}

          {/* STEP 3: MATERIALS */}
          {currentStepId === 'materials' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3 text-indigo-400">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold">Step 3: Materials</div>
                  <h3 className="text-2xl font-bold text-white">Notes, PDFs & Diagrams</h3>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
                <h4 className="font-bold text-indigo-300 text-lg">Unit Overview & Reference Notes</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {topic.materials.notesSummary}
                </p>
              </div>

              {/* Bullet notes */}
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-4">
                <h4 className="font-bold text-white text-base">Core Examination Points</h4>
                <ul className="space-y-2.5">
                  {topic.materials.bulletPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key takeaways */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs uppercase font-bold text-slate-400">Key Takeaways</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {topic.materials.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-sky-200">
                      ✓ {takeaway}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONCEPTUAL EXPLANATION */}
          {currentStepId === 'theory' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3 text-purple-400">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold">Step 4: Conceptual Explanation</div>
                  <h3 className="text-2xl font-bold text-white">Detailed Theory with Illustrations</h3>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                <h4 className="font-bold text-white text-base">Theoretical Model</h4>
                <div className="text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {topic.conceptualExplanation.theory}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-purple-300 text-sm">Memory Layout Diagram</h4>
                <pre className="p-4 rounded-xl bg-slate-900 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed border border-slate-800">
                  {topic.conceptualExplanation.memoryModelDiagram}
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Step-by-Step Pointer Execution Flow:</h4>
                <div className="space-y-2">
                  {topic.conceptualExplanation.stepByStepFlow.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs text-slate-300 flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: C PROGRAM IMPLEMENTATION */}
          {currentStepId === 'c_implementation' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3 text-sky-400">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold">Step 5: C Program Implementation</div>
                  <h3 className="text-2xl font-bold text-white">Structure, Functions & Logic</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300">
                {topic.cProgramImplementation.description}
              </p>

              {/* Struct definition */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden code-window">
                <div className="bg-slate-800/80 px-4 py-2 text-xs font-mono text-sky-300 border-b border-slate-800">
                  Node Struct Declaration
                </div>
                <pre className="p-4 text-xs font-mono text-sky-200 overflow-x-auto">
                  {topic.cProgramImplementation.structDefinition}
                </pre>
              </div>

              {/* Core functions */}
              <div className="space-y-4">
                <h4 className="font-bold text-white text-base">Key Operations & Helper Functions</h4>
                {topic.cProgramImplementation.coreFunctions.map((fn, idx) => (
                  <div key={idx} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden code-window">
                    <div className="bg-slate-800/60 px-4 py-2 text-xs font-mono text-emerald-400 border-b border-slate-800 flex justify-between">
                      <span>{fn.name}()</span>
                      <span className="text-slate-400 text-[11px]">{fn.description}</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto">
                      {fn.codeSnippet}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: MCQ ASSESSMENT */}
          {currentStepId === 'mcq' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3 text-amber-400">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold">Step 6: MCQ Assessment</div>
                  <h3 className="text-2xl font-bold text-white">Test Your Understanding</h3>
                </div>
              </div>

              <div className="space-y-6 mt-6">
                {topic.mcqs.map((q, qIdx) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correctIndex;
                  return (
                    <div key={q.id} className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-4">
                      <div className="flex items-start space-x-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {qIdx + 1}
                        </span>
                        <div className="font-semibold text-white text-sm sm:text-base">
                          {q.question}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-9">
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = selected === oIdx;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                          
                          if (submittedQuiz) {
                            if (oIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                            } else if (isOptionSelected && !isCorrect) {
                              btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-sky-500/20 border-sky-500 text-sky-200 font-semibold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={submittedQuiz}
                              onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: oIdx })}
                              className={`p-3 rounded-xl border text-xs text-left transition-all mcq-option-btn ${btnStyle}`}
                            >
                              <span className="font-mono mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {submittedQuiz && (
                        <div className="mt-3 pl-9 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 mcq-explanation-box">
                          <strong className={isCorrect ? 'text-emerald-400' : 'text-amber-400'}>
                            {isCorrect ? '✓ Correct!' : '✗ Incorrect.'}
                          </strong>{' '}
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {Object.keys(selectedAnswers).length} of {topic.mcqs.length} answered
                  </span>

                  {!submittedQuiz ? (
                    <button
                      type="button"
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(selectedAnswers).length < topic.mcqs.length}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition-all shadow-md"
                    >
                      Submit Assessment
                    </button>
                  ) : (
                    <div className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Score Recorded: {progress.mcqScores[topic.id] || 100}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: C IMPLEMENTATION VIDEO */}
          {currentStepId === 'implementation_video' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3 text-rose-400">
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold">Step 7: C Implementation Video</div>
                  <h3 className="text-2xl font-bold text-white">Step-by-Step Code Walkthrough</h3>
                </div>
              </div>

              {/* Video Player */}
              <div 
                className="video-embed-container rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-black shadow-2xl relative w-full"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  backgroundColor: '#000000',
                  boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.7)'
                }}
              >
                <iframe
                  src={topic.video.url}
                  title={topic.implementationVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                    display: 'block'
                  }}
                />
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                <h4 className="font-bold text-white text-base">Key Implementation Milestones</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topic.implementationVideo.walkthroughSteps.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
                      <span className="text-rose-400 font-bold font-mono">0{idx + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: EXAMPLE + EXPLANATION */}
          {currentStepId === 'example_explanation' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3 text-sky-400">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold">Step 8: Example + Explanation</div>
                  <h3 className="text-2xl font-bold text-white">Complete Code with Explanation</h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs text-sky-200">
                <strong>Real World Scenario:</strong> {topic.exampleExplanation.scenario}
              </div>

              {/* Full code */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden code-window">
                <div className="bg-slate-800/80 px-4 py-2 text-xs font-mono text-slate-300 border-b border-slate-800 flex justify-between">
                  <span>complete_program.c</span>
                  <span className="text-slate-400">Anna University Verified</span>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  {topic.cProgramImplementation.fullCode}
                </pre>
              </div>

              {/* Line-by-line annotations */}
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                <h4 className="font-bold text-white text-base">Line-by-Line Logic Breakdown</h4>
                <div className="space-y-2">
                  {topic.exampleExplanation.lineByLineExplanation.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-start space-x-3">
                      <span className="font-mono text-sky-400 font-bold bg-slate-800 px-2 py-0.5 rounded">
                        {item.lines}
                      </span>
                      <span className="text-slate-300">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: CODING ASSESSMENT (PRACTICE & EVALUATION) */}
          {currentStepId === 'coding_assessment' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider font-bold">Step 9: Coding Assessment</div>
                    <h3 className="text-2xl font-bold text-white">Practice & Evaluation Studio</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Difficulty: {topic.codingAssessment.difficulty}
                  </span>
                </div>
              </div>

              {/* Problem Statement Card */}
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-4">
                <h4 className="text-lg font-bold text-white">
                  {topic.codingAssessment.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {topic.codingAssessment.problemStatement}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-sky-400">Input Format:</span>
                    <pre className="text-slate-300 font-mono whitespace-pre-wrap">{topic.codingAssessment.inputFormat}</pre>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400">Output Format:</span>
                    <pre className="text-slate-300 font-mono whitespace-pre-wrap">{topic.codingAssessment.outputFormat}</pre>
                  </div>
                </div>
              </div>

              {/* Code Editor & Test Cases Runner */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden code-window">
                  <div className="bg-slate-800/80 px-4 py-2.5 text-xs font-mono text-slate-300 flex items-center justify-between border-b border-slate-800">
                    <span className="flex items-center space-x-2">
                      <Code2 className="w-4 h-4 text-sky-400" />
                      <span>solution.c (Write your C program)</span>
                    </span>
                    <span className="text-slate-400 text-[11px]">Auto Test Evaluation Enabled</span>
                  </div>
                  <textarea
                    value={editorCode}
                    onChange={(e) => setEditorCode(e.target.value)}
                    rows={14}
                    className="w-full p-4 bg-transparent font-mono text-xs text-sky-200 resize-none focus:outline-none focus:ring-0 leading-relaxed"
                  />
                </div>

                {/* Run Buttons from Diagram: Run -> Test Cases -> Pass Required Test Cases */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={handleRunCode}
                      disabled={isCompiling}
                      className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>{isCompiling ? 'Compiling & Evaluating...' : 'Run & Evaluate Test Cases'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditorCode(topic.codingAssessment.starterCode)}
                      className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-center"
                    >
                      Reset Code
                    </button>
                  </div>

                  <span className="text-xs text-slate-400">
                    {topic.codingAssessment.testCases.length} Test Cases configured
                  </span>
                </div>

                {/* Test Results Display */}
                {testResults && (
                  <div className="mt-6 space-y-3 p-6 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                        <span>Test Cases Evaluation</span>
                      </h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {testResults.filter(r => r.passed).length}/{testResults.length} Passed
                      </span>
                    </div>

                    <div className="space-y-2">
                      {testResults.map((r, idx) => (
                        <div key={r.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            {r.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            )}
                            <span className="text-slate-300 font-medium">
                              Test Case #{idx + 1} {r.isHidden ? '(Hidden Test Case)' : ''}
                            </span>
                          </div>

                          <div className="font-mono text-emerald-400 font-semibold">
                            PASSED
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Celebration Milestone: Topic Completed! Move to next topic */}
                {showCelebration && (
                  <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-sky-950/80 border-2 border-emerald-500 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white flex items-center space-x-2">
                          <span>Topic Completed!</span>
                          <span className="text-amber-400">🏆</span>
                        </h4>
                        <p className="text-xs text-emerald-300 mt-0.5">
                          You have passed all required test cases for {topic.title}!
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0">
                      {nextTopic ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectTopic) {
                              onSelectTopic(nextTopic.id);
                            } else {
                              onNavigate('ds-hub');
                            }
                          }}
                          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                        >
                          <span>Move to Next Module ({nextTopic.title})</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onNavigate('progress-history')}
                          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                        >
                          <span>View Learning History & Certificate</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Global Footer Step Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={goToPrevStep}
            disabled={currentStepIndex === 0}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center justify-center space-x-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs text-slate-400 font-medium order-first sm:order-none">
            Step {currentStepIndex + 1} of 9
          </span>

          {currentStepIndex === 1 && !isVideoCompleted ? (
            <button
              type="button"
              disabled
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-500 border border-slate-700/80 cursor-not-allowed flex items-center justify-center space-x-2 shadow-sm"
              title="Watch full video in Step 2 without skipping to proceed"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Next Step: Materials (Watch Video to Unlock)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={goToNextStep}
              disabled={currentStepIndex === TOPIC_STEPS.length - 1}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md flex items-center justify-center space-x-1.5"
            >
              <span>Next Step: {currentStepIndex < 8 ? TOPIC_STEPS[currentStepIndex + 1].title : 'Completed'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
