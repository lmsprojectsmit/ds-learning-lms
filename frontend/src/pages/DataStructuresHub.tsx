import { useState } from 'react';
import { 
  Network, 
  Layers, 
  Database, 
  GitBranch, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Award,
  BarChart2,
  Lock
} from 'lucide-react';
import type { UserProgress } from '../types/lms';
import { DS_TOPICS, isDSTopicUnlocked, getPrerequisiteTopic } from '../data/curriculumData';

interface DataStructuresHubProps {
  progress: UserProgress;
  onSelectTopic: (topicId: string) => void;
  onNavigate: (page: string) => void;
  onGoBack?: () => void;
}

export const DataStructuresHub: React.FC<DataStructuresHubProps> = ({
  progress,
  onSelectTopic,
  onNavigate,
  onGoBack
}) => {
  const [showIntroDetails, setShowIntroDetails] = useState(false);
  const [lockedModuleAlert, setLockedModuleAlert] = useState<{ target: string; prereq: string } | null>(null);

  const completedCount = progress.completedDSTopicIds.length;
  const isAllDsDone = completedCount >= DS_TOPICS.length;

  const handleCardClick = (topicId: string, topicTitle: string) => {
    const unlocked = isDSTopicUnlocked(topicId, progress);
    if (!unlocked) {
      const prereq = getPrerequisiteTopic(topicId);
      setLockedModuleAlert({
        target: topicTitle,
        prereq: prereq ? prereq.title : 'the previous module'
      });
      return;
    }
    setLockedModuleAlert(null);
    onSelectTopic(topicId);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        
        {/* Top Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onGoBack ? onGoBack() : onNavigate('student-dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <span className="text-xs text-sky-400 font-semibold px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30">
            Core Curriculum
          </span>
        </div>

        {/* Main Title & Anna University 2025 Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Anna University 2025 Regulation Core Subject</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent">
              DATA STRUCTURES (MAIN SYSTEM)
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Learn and implement all Data Structures as per Anna University 2025 Regulation with conceptual theory, C code implementations, and auto-evaluated test cases.
          </p>
        </div>

        {/* DATA STRUCTURES COMPLETED Celebration Milestone (when completed) */}
        {isAllDsDone && (
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border-2 border-emerald-500 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4 sm:space-x-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 flex-shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>DATA STRUCTURES COMPLETED</span>
                  <span className="text-amber-400">🏆</span>
                </h3>
                <p className="text-sm text-emerald-300 mt-1">
                  You have successfully learned all Data Structures topics as per Anna University 2025 Regulation!
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('progress-history')}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 flex items-center space-x-2 shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all flex-shrink-0"
            >
              <BarChart2 className="w-4 h-4" />
              <span>View Learning Progress / History</span>
            </button>
          </div>
        )}

        {/* 1. DS Introduction: "What are Data Structures? Why do we need them?" */}
        <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl transition-all">
          <div 
            className="flex items-center justify-between cursor-pointer gap-2"
            onClick={() => setShowIntroDetails(!showIntroDetails)}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  Foundational Overview
                </div>
                <h2 className="text-xl font-bold text-white">
                  DS Introduction: What are Data Structures? Why do we need them?
                </h2>
              </div>
            </div>

            <button className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
              {showIntroDetails ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

          {/* Collapsible details */}
          {showIntroDetails && (
            <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40 space-y-2">
                  <h4 className="font-bold text-white text-base flex items-center space-x-2">
                    <span className="text-sky-400">●</span>
                    <span>What is a Data Structure?</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A data structure is a specialized format for organizing, processing, retrieving, and storing data in computer memory so that operations can be performed efficiently.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40 space-y-2">
                  <h4 className="font-bold text-white text-base flex items-center space-x-2">
                    <span className="text-indigo-400">●</span>
                    <span>Why do we need them?</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Modern software processes massive volumes of data. Choosing the right data structure reduces algorithm time complexity from polynomial to logarithmic, preventing system freezes and optimizing CPU utilization.
                  </p>
                </div>
              </div>

              {/* Classification overview table */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Linear vs Non-Linear Classification
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-sky-400">Linear Structures:</span>
                    <p className="text-slate-400 mt-1">Elements arranged sequentially (Linked Lists, Stacks, Queues).</p>
                  </div>
                  <div>
                    <span className="font-bold text-purple-400">Non-Linear Structures:</span>
                    <p className="text-slate-400 mt-1">Elements arranged hierarchically or connected in networks (Trees, Graphs).</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sequential Progression Alert Modal / Banner */}
        {lockedModuleAlert && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/80 border-2 border-amber-500/80 text-amber-200 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base flex items-center space-x-2">
                  <span>Module Locked: {lockedModuleAlert.target}</span>
                </h4>
                <p className="text-xs sm:text-sm text-amber-300/90 mt-0.5">
                  Sequential Progression Enforced: You must complete <strong>{lockedModuleAlert.prereq}</strong> first before starting this module.
                </p>
              </div>
            </div>
            <button
              onClick={() => setLockedModuleAlert(null)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold text-amber-200 transition-all flex-shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 2. Select DS Topic Hub (Matching the 5 cards in the diagram) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Curriculum Syllabus
              </div>
              <h2 className="text-2xl font-bold text-white">
                Select DS Topic
              </h2>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Completed: <span className="text-sky-400">{completedCount}</span> / {DS_TOPICS.length}
            </div>
          </div>

          {/* 5 Topic Cards Grid from diagram: LINKED LIST, STACK, QUEUE, TREE, GRAPH */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: LINKED LIST */}
            {(() => {
              const isUnlocked = isDSTopicUnlocked('singly-linked-list', progress);
              const isCompleted = progress.completedDSTopicIds.includes('singly-linked-list');
              return (
                <div 
                  onClick={() => handleCardClick('singly-linked-list', 'Linked List')}
                  className={`p-6 rounded-3xl bg-slate-900/80 border transition-all cursor-pointer flex flex-col justify-between shadow-xl group relative overflow-hidden ds-topic-card ${
                    !isUnlocked
                      ? 'border-slate-800 opacity-60 hover:border-slate-700'
                      : 'border-rose-500/40 hover:border-rose-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                        <Share2 className="w-6 h-6" />
                      </div>
                      {isCompleted ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : !isUnlocked ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked</span>
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                        LINKED LIST
                      </h3>
                      <p className="text-xs text-rose-400 font-semibold mt-0.5">
                        Dynamic Linear Pointers
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 ds-subtopics-box">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>Singly Linked List</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>Doubly Linked List</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>Circular Linked List</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-rose-400">
                    <span>Start 9-Step Topic Study</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })()}

            {/* Card 2: STACK */}
            {(() => {
              const isUnlocked = isDSTopicUnlocked('stack-ds', progress);
              const isCompleted = progress.completedDSTopicIds.includes('stack-ds');
              const prereq = getPrerequisiteTopic('stack-ds');
              return (
                <div 
                  onClick={() => handleCardClick('stack-ds', 'Stack')}
                  className={`p-6 rounded-3xl bg-slate-900/80 border transition-all cursor-pointer flex flex-col justify-between shadow-xl group relative overflow-hidden ds-topic-card ${
                    !isUnlocked
                      ? 'border-slate-800 opacity-60 hover:border-slate-700'
                      : 'border-emerald-500/40 hover:border-emerald-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <Layers className="w-6 h-6" />
                      </div>
                      {isCompleted ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : !isUnlocked ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked</span>
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        STACK
                      </h3>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                        LIFO Discipline
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 ds-subtopics-box">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Array Implementation (Push/Pop)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Linked List Stack</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Infix to Postfix & Evaluation</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                    {isUnlocked ? (
                      <>
                        <span className="text-emerald-400">Start 9-Step Topic Study</span>
                        <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span className="text-slate-400 flex items-center space-x-1">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Requires {prereq?.title || 'Previous Module'}</span>
                        </span>
                        <Lock className="w-4 h-4 text-amber-400/80" />
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Card 3: QUEUE */}
            {(() => {
              const isUnlocked = isDSTopicUnlocked('queue-ds', progress);
              const isCompleted = progress.completedDSTopicIds.includes('queue-ds');
              const prereq = getPrerequisiteTopic('queue-ds');
              return (
                <div 
                  onClick={() => handleCardClick('queue-ds', 'Queue')}
                  className={`p-6 rounded-3xl bg-slate-900/80 border transition-all cursor-pointer flex flex-col justify-between shadow-xl group relative overflow-hidden ds-topic-card ${
                    !isUnlocked
                      ? 'border-slate-800 opacity-60 hover:border-slate-700'
                      : 'border-sky-500/40 hover:border-sky-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                        <Database className="w-6 h-6" />
                      </div>
                      {isCompleted ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : !isUnlocked ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked</span>
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        QUEUE
                      </h3>
                      <p className="text-xs text-sky-400 font-semibold mt-0.5">
                        FIFO Discipline
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 ds-subtopics-box">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span>Simple Queue</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span>Circular Queue</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span>Priority Queue</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                    {isUnlocked ? (
                      <>
                        <span className="text-sky-400">Start 9-Step Topic Study</span>
                        <ChevronRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span className="text-slate-400 flex items-center space-x-1">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Requires {prereq?.title || 'Previous Module'}</span>
                        </span>
                        <Lock className="w-4 h-4 text-amber-400/80" />
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Card 4: TREE */}
            {(() => {
              const isUnlocked = isDSTopicUnlocked('tree-ds', progress);
              const isCompleted = progress.completedDSTopicIds.includes('tree-ds');
              const prereq = getPrerequisiteTopic('tree-ds');
              return (
                <div 
                  onClick={() => handleCardClick('tree-ds', 'Tree')}
                  className={`p-6 rounded-3xl bg-slate-900/80 border transition-all cursor-pointer flex flex-col justify-between shadow-xl group relative overflow-hidden ds-topic-card ${
                    !isUnlocked
                      ? 'border-slate-800 opacity-60 hover:border-slate-700'
                      : 'border-purple-500/40 hover:border-purple-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        <GitBranch className="w-6 h-6" />
                      </div>
                      {isCompleted ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : !isUnlocked ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked</span>
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        TREE
                      </h3>
                      <p className="text-xs text-purple-400 font-semibold mt-0.5">
                        Hierarchical Non-Linear
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 ds-subtopics-box">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>Binary Tree</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>Binary Search Tree</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>AVL Tree & Heap</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                    {isUnlocked ? (
                      <>
                        <span className="text-purple-400">Start 9-Step Topic Study</span>
                        <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span className="text-slate-400 flex items-center space-x-1">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Requires {prereq?.title || 'Previous Module'}</span>
                        </span>
                        <Lock className="w-4 h-4 text-amber-400/80" />
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Card 5: GRAPH */}
            {(() => {
              const isUnlocked = isDSTopicUnlocked('graph-ds', progress);
              const isCompleted = progress.completedDSTopicIds.includes('graph-ds');
              const prereq = getPrerequisiteTopic('graph-ds');
              return (
                <div 
                  onClick={() => handleCardClick('graph-ds', 'Graph')}
                  className={`p-6 rounded-3xl bg-slate-900/80 border transition-all cursor-pointer flex flex-col justify-between shadow-xl group relative overflow-hidden ds-topic-card ${
                    !isUnlocked
                      ? 'border-slate-800 opacity-60 hover:border-slate-700'
                      : 'border-amber-500/40 hover:border-amber-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Network className="w-6 h-6" />
                      </div>
                      {isCompleted ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : !isUnlocked ? (
                        <span className="flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Locked</span>
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        GRAPH
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold mt-0.5">
                        Networks & Traversal
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 ds-subtopics-box">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>Directed / Undirected Graph</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>Weighted Graph</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>Adjacency Matrix & Adjacency List</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                    {isUnlocked ? (
                      <>
                        <span className="text-amber-400">Start 9-Step Topic Study</span>
                        <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span className="text-slate-400 flex items-center space-x-1">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Requires {prereq?.title || 'Previous Module'}</span>
                        </span>
                        <Lock className="w-4 h-4 text-amber-400/80" />
                      </>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

      </div>
    </div>
  );
};
