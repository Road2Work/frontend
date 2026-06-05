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
  role?: 'user' | 'admin'
  status?: 'active' | 'inactive'
  freeInterviewQuota?: number
  usedInterviewCount?: number
  createdAt: string
  updatedAt?: string
}

export type AdminUser = Pick<User, 'id' | 'name' | 'email' | 'role' | 'status' | 'freeInterviewQuota' | 'usedInterviewCount' | 'createdAt'>

export type AdminAnalytics = {
  totalUsers: number
  activeUsers: number
  totalCompletedInterviews: number
  totalCvUploaded: number
  totalManualProfiles: number
  averageCareerReadinessScore: number
  averageEvidenceScore: number
  mostSelectedRoles: Array<{ roleName: string; count: number }>
  mostCommonWeaknesses: Array<{ weakness: string; count: number }>
  cvUploadVsManualProfileRatio: { cv: number; manual: number }
  interviewCompletionRate: number
}

export type Domain = {
  id: string
  name: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type RoleFamily = {
  id: string
  domainId: string
  name: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
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
  domainId?: string
  roleFamilyId?: string
  roleFamily?: string
  name?: string
  roleName: string
  description: string
  coreSkills?: string[]
  tools?: string[]
  competencyMap?: InterviewCompetency[]
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  skills?: RoleSkill[]
}

export type LegacyRoleFamily = {
  name: string
  roles: Role[]
}

export type SkillEvidence = {
  id?: string
  skillName: string
  evidenceText: string
  evidenceLevel: 1 | 2 | 3 | 4 | 5
  source: 'cv' | 'manual' | 'interview' | 'user_edit'
}

export type Profile = {
  id: string
  userId: string
  source?: 'cv' | 'manual'
  targetRoleId?: string
  selectedRoleId?: string | null
  contextSource: 'cv' | 'short_profile' | null
  professionalSummary?: string
  profileSummary: string | null
  skills: string[]
  tools: string[]
  skillEvidence?: SkillEvidence[]
  achievementSignals?: string[]
  experienceSummary: string | null
  evidenceScore?: number
  evidenceItems: string[]
  profileCompleteness?: number
  aiConfidence?: number
  status?: 'draft' | 'reviewed' | 'confirmed'
  initialEvidenceScore: number
  createdAt: string
  updatedAt?: string
}

export type InterviewCompetency =
  | 'self_introduction'
  | 'interest_need_of_learning'
  | 'self_confidence'
  | 'skill'
  | 'solution_skill'
  | 'predictive_based'
  | 'predictive_based_recruitment'
  | 'agile_culture'
  | 'role_relevance_and_evidence'
  | 'communication_clarity'
  | 'technical_accuracy'
  | 'evidence_specificity'
  | 'star_structure'

export type HrdState = 'idle' | 'asking' | 'listening' | 'thinking' | 'clarifying' | 'completed' | 'error'

export type PracticeMode = 'first_session' | 'adaptive_from_history' | 'retry_focus'

export type RecordingStopReason = 'user_mic_off' | 'timer_timeout'

export type RecordingPolicy = {
  autoStartMic: true
  autoStartTrigger: 'after_hrd_question_finished'
  answerLimitSeconds: number
  silenceAutoStopEnabled: false
  userCanStopBeforeLimit: true
  stopReasons?: RecordingStopReason[]
  audioFormat?: 'webm' | 'wav' | 'mp3'
}

export type AskedQuestionHistoryItem = {
  questionId: string
  questionText: string
  questionType?: 'main' | 'clarification'
  competencyTarget: InterviewCompetency
  askedAt?: string
}

export type AdaptivePracticeMemory = {
  enabled: boolean
  previousSessionIds: string[]
  previousInterviewSummary?: string | null
  previousScoreBreakdown?: ScoreBreakdown | null
  previousDetectedWeaknesses: string[]
  previousEvidenceLevels?: number[]
  askedQuestionHistory: AskedQuestionHistoryItem[]
  latestInterviewFeedback?: string | null
  nextBestActions?: NextBestAction[]
  improvementFocus: string[]
  avoidRepeatedQuestions: boolean
  retryMode: boolean
}

export type InterviewSession = {
  id: string
  userId: string
  profileId: string
  roleId?: string
  selectedRoleId?: string
  status: 'active' | 'completed' | 'cancelled'
  questionIndex?: number
  totalMainQuestions?: number
  questionCount?: number
  currentQuestionIndex?: number
  clarificationCount: number
  maxClarification?: number
  currentHrdState?: HrdState
  currentState?: HrdState
  recordingPolicy?: RecordingPolicy
  practiceMode?: PracticeMode
  adaptiveMemory?: AdaptivePracticeMemory
  createdAt: string
  startedAt?: string
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
  | 'low_self_confidence'
  | 'weak_solution_skill'

export type InterviewQuestion = {
  id: string
  sessionId: string
  questionText: string
  questionType: 'main' | 'clarification'
  parentQuestionId?: string | null
  competencyTarget?: InterviewCompetency
  clarificationType?: ClarificationType | null
  generatedFrom?: 'role_context' | 'weakness_history' | 'next_best_action' | 'retry_focus'
  repeatedFromQuestionId?: string | null
  hrdState?: 'asking' | 'clarifying'
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
  id?: string
  sessionId?: string
  questionId?: string
  questionType?: 'main' | 'clarification'
  transcriptText?: string
  sttConfidence?: number
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
  interviewReadinessScore?: number
  readinessStatus: 'Ready' | 'Almost Ready' | 'Needs Practice'
  summary?: string
  evidenceLevel: number
  selectedRole?: { id: string; name: string }
  targetRole: Pick<Role, 'id' | 'roleName' | 'roleFamily'>
  strengths: ResultInsight[]
  improvementAreas: ResultInsight[]
  beforeAfterImprovement: BeforeAfterImprovement[]
  nextPracticeRecommendation: NextPracticeRecommendation
  adaptiveSessionSuggestion?: {
    recommendedFocus: string[]
    avoidRepeatedQuestions: boolean
    suggestedPracticeMode: PracticeMode
  }
  scoreBreakdown: ScoreBreakdown
  createdAt: string
}

export type InterviewHistoryItem = {
  sessionId: string
  resultId: string
  targetRole: string
  finalScore: number
  readinessStatus: string
  createdAt: string
}

export type RoleFitResult = {
  id: string
  profileId: string
  roleId: string
  roleName: string
  fitScore: number
  rank?: number | null
  reason: string
  strengths: string[]
  gaps: string[]
  skillOverlap: {
    matched: number
    total: number
    matchedSkills: string[]
    missingSkills: string[]
  }
  createdAt: string
}

export type NextBestAction = {
  id: string
  title: string
  description: string
  impactLabel: 'Tinggi' | 'Sedang' | 'Rendah'
  impactScoreText?: string
  actionType: 'complete_profile' | 'practice_interview' | 'review_role' | 'review_role_fit' | 'download_summary' | 'add_evidence'
}

export type CareerReadinessDashboard = {
  user: Pick<User, 'id' | 'name' | 'email' | 'status'>
  profileId: string
  selectedRole: { id: string; name: string }
  careerReadinessScore: number
  readinessStatus: 'Belum siap' | 'Mulai siap' | 'Hampir siap' | 'Siap melamar'
  scoreMessage?: string
  evidenceScore: number
  roleFitScore: number
  interviewReadinessScore: number
  profileCompletenessScore: number
  nextBestActions: NextBestAction[]
  strengths: string[]
  gaps: string[]
  profileSummary: string | { text: string; tags: string[] }
  roleRecommendation?: RoleFitResult | null
  latestInterviewFeedback?: {
    sessionId: string
    score: number
    summary: string
    completedAt: string
  } | null
  adaptiveInterviewInsight?: {
    lastWeaknesses: string[]
    recommendedFocus: string[]
    avoidRepeatedQuestions: boolean
  }
  activityTimeline: Array<{
    id: string
    title: string
    description: string
    createdAt: string
  }>
  canDownloadSummary: boolean
  downloadRequirement?: string
  updatedAt: string
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

export type ManualProfilePayload = {
  domainId: string
  roleFamilyId: string
  targetRoleId: string
  mostRelevantExperience: string
  skillsAndTools: string
  projectExperience?: string
  achievementOrImpact?: string
}

export type UpdateProfilePayload = Partial<{
  professionalSummary: string
  skills: string[]
  tools: string[]
  skillEvidence: SkillEvidence[]
  achievementSignals: string[]
}>

export type GenerateRoleFitRankingPayload = {
  profileId: string
  limit?: number
}

export type RoleFitScorePayload = {
  profileId: string
  roleId: string
}

export type ConfirmRolePayload = {
  profileId: string
  roleId: string
  source?: 'recommended' | 'manual'
}

export type CreateSessionPayload = {
  profileId: string
  roleId?: string
  selectedRoleId?: string
  totalMainQuestions?: number
  questionCount?: number
  practiceMode?: PracticeMode
  retryMode?: boolean
  avoidRepeatedQuestions?: boolean
  improvementFocus?: string[]
  requestedCompetencies?: InterviewCompetency[]
}

export type SubmitVoiceAnswerPayload = {
  questionId: string
  questionType: 'main' | 'clarification'
  audioFile: Blob
  recordingStartedAt: string
  recordingEndedAt: string
  answerDurationSec: number
  maxDurationSec: number
  stopReason: RecordingStopReason
  autoMicStarted: boolean
  silenceAutoStopEnabled: boolean
}

export type SubmitVoiceAnswerResponse = {
  answer: Partial<AnswerEvaluation>
  nextQuestion: InterviewQuestion | null
  session?: Partial<InterviewSession>
  isCompleted: boolean
  resultId?: string | null
  dashboardUpdated?: boolean
  adaptiveMemoryUpdated?: boolean
}

export type CreateDomainPayload = Pick<Domain, 'name' | 'description'> & {
  isActive?: boolean
}

export type CreateRoleFamilyPayload = Pick<RoleFamily, 'domainId' | 'name' | 'description'> & {
  isActive?: boolean
}

export type CreateRolePayload = {
  domainId: string
  roleFamilyId: string
  name: string
  description: string
  coreSkills: string[]
  tools: string[]
  competencyMap?: InterviewCompetency[]
  isActive?: boolean
}
