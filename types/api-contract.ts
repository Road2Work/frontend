export type ApiSuccess<TData> = {
  success: true
  message: string
  data: TData
}

export type ApiFailure = {
  success: false
  message: string
  error: {
    code: string
    details: unknown
  }
}

export type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure

export type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

export type RoleSkill = {
  id: string
  roleId?: string
  skillName: string
  skillType: 'core' | 'tool' | 'soft' | 'domain'
  importanceLevel: number
}

export type Role = {
  id: string
  roleFamily: string
  roleName: string
  description: string
  skills?: RoleSkill[]
}

export type RoleFamily = {
  name: string
  roles: Role[]
}

export type Profile = {
  id: string
  userId: string
  targetRoleId: string
  contextSource: 'cv' | 'short_profile' | null
  profileSummary: string | null
  skills: string[]
  tools: string[]
  experienceSummary: string | null
  evidenceItems: string[]
  initialEvidenceScore: number
  createdAt: string
}

export type HrdState = 'idle' | 'asking' | 'listening' | 'thinking' | 'clarifying' | 'completed'

export type InterviewSession = {
  id: string
  userId: string
  profileId: string
  roleId: string
  status: 'active' | 'completed' | 'cancelled'
  questionIndex: number
  totalMainQuestions: number
  clarificationCount: number
  currentHrdState: HrdState
  createdAt: string
  completedAt?: string | null
}

export type ClarificationType =
  | 'unclear_audio'
  | 'weak_evidence'
  | 'missing_tools'
  | 'missing_impact'
  | 'missing_personal_contribution'
  | 'weak_star_structure'
  | 'low_role_relevance'

export type InterviewQuestion = {
  id: string
  sessionId: string
  questionText: string
  questionType: 'main' | 'clarification'
  parentQuestionId?: string | null
  competencyTarget?: string
  clarificationType?: ClarificationType | null
  hrdState: 'asking' | 'clarifying'
}

export type ScoreBreakdown = {
  roleRelevance: number
  starStructure: number
  evidenceSpecificity: number
  technicalAccuracy: number
  communicationClarity: number
  selfAwareness: number
}

export type AnswerEvaluation = {
  scoreBreakdown: ScoreBreakdown
  answerScore: number
  detectedWeaknesses: string[]
  evidenceLevel: number
  needsClarification: boolean
  clarificationType?: ClarificationType | null
  feedback: string
  strongerAnswer: string
}

export type ResultInsight = {
  title: string
  description: string
  evidence?: string | null
}

export type BeforeAfterImprovement = {
  questionText: string
  beforeAnswer: string
  afterAnswer: string
  improvementNotes: string[]
}

export type NextPracticeRecommendation = {
  practiceType:
    | 'Behavioral STAR Practice'
    | 'Evidence Booster Practice'
    | 'Technical Interview Practice'
    | 'Answer Clarity Practice'
    | 'Role Understanding Practice'
    | 'Reflection Practice'
  reason: string
  focusAreas: string[]
}

export type InterviewResult = {
  id: string
  sessionId: string
  finalScore: number
  readinessStatus: 'Ready' | 'Almost Ready' | 'Needs Practice'
  evidenceLevel: number
  targetRole: Pick<Role, 'id' | 'roleName' | 'roleFamily'>
  strengths: ResultInsight[]
  improvementAreas: ResultInsight[]
  beforeAfterImprovement: BeforeAfterImprovement[]
  nextPracticeRecommendation: NextPracticeRecommendation
  scoreBreakdown: ScoreBreakdown
  createdAt: string
}

export type SignupPayload = {
  name: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type ShortProfilePayload = {
  mostRelevantExperience: string
  skillsAndTools: string
  projectExperience?: string
  achievementOrImpact?: string
}

export type CreateProfilePayload = {
  targetRoleId: string
}

export type CreateSessionPayload = {
  profileId: string
  roleId: string
  totalMainQuestions?: number
}
