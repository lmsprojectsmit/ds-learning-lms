export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
  department?: string;
}

export interface ManagedUserAccount {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  passwordPlain: string;
  department?: string;
  regNumber?: string;
  lastLogin?: string;
  status: 'active' | 'suspended';
}

export interface SubjectUnit {
  unitNumber: number;
  title: string;
  topics: string[];
}

export interface CustomSubject {
  id: string;
  code: string;
  title: string;
  department: string;
  regulation: string;
  description: string;
  units: SubjectUnit[];
  createdAt: string;
  createdBy: string;
}

export type SubjectId = 'c_ds' | 'progress';

export interface BackendHealthStatus {
  online: boolean;
  message?: string;
  dbConnected?: boolean;
  checkedAt?: Date;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingAssessment {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  starterCode: string;
  solutionReference: string;
  testCases: TestCase[];
}

export type TopicStepId = 
  | 'concept'
  | 'videos'
  | 'materials'
  | 'theory'
  | 'c_implementation'
  | 'mcq'
  | 'implementation_video'
  | 'example_explanation'
  | 'coding_assessment';

export interface TopicStepInfo {
  id: TopicStepId;
  stepNumber: number;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface DSTopic {
  id: string;
  category: 'linked_list' | 'stack' | 'queue' | 'tree' | 'graph';
  categoryTitle: string;
  title: string;
  subvariety?: string;
  summary: string;
  conceptWhat: string;
  conceptWhy: string;
  timeComplexity: {
    access?: string;
    search?: string;
    insertion?: string;
    deletion?: string;
  };
  video: {
    title: string;
    url: string;
    duration: string;
    transcriptHighlights: string[];
  };
  materials: {
    notesSummary: string;
    bulletPoints: string[];
    diagramUrl?: string;
    keyTakeaways: string[];
  };
  conceptualExplanation: {
    theory: string;
    memoryModelDiagram: string;
    stepByStepFlow: string[];
  };
  cProgramImplementation: {
    description: string;
    structDefinition: string;
    coreFunctions: { name: string; description: string; codeSnippet: string }[];
    fullCode: string;
  };
  mcqs: MCQQuestion[];
  implementationVideo: {
    title: string;
    duration: string;
    walkthroughSteps: string[];
  };
  exampleExplanation: {
    scenario: string;
    fullCodeWithComments: string;
    lineByLineExplanation: { lines: string; note: string }[];
  };
  codingAssessment: CodingAssessment;
}

export interface CFundamentalLesson {
  id: string;
  title: string;
  category?: string;
  categoryTitle?: string;
  order: number;
  concepts: string;
  syntax: string;
  examples: string;
  sampleCode: string;
  expectedOutput: string;
  exercise?: {
    question: string;
    starterCode: string;
    solution: string;
    hint: string;
  };
}

export interface UserProgress {
  cFundamentalsCompleted: boolean;
  completedCFundamentalLessonIds: string[];
  completedDSTopicIds: string[];
  completedVideoTopicIds?: string[];
  mcqScores: Record<string, number>; // topicId -> score %
  codingChallengesCompleted: Record<string, boolean>; // topicId -> boolean
  streakDays: number;
  hoursSpent: number;
}
