import type {
  ApiSuccess,
  CreateProfilePayload,
  CreateSessionPayload,
  InterviewQuestion,
  InterviewResult,
  InterviewSession,
  LoginPayload,
  Profile,
  Role,
  RoleFamily,
  ShortProfilePayload,
  SignupPayload,
  User,
} from '@/types/api-contract'

const now = '2026-05-17T10:00:00.000Z'
const mockUser: User = {
  id: 'usr_001',
  name: 'Sari Dewi',
  email: 'sari@example.com',
  createdAt: now,
}

const roles: Role[] = [
  {
    id: 'role_data_analyst',
    roleFamily: 'Data & AI',
    roleName: 'Data Analyst',
    description: 'Analyze data, build dashboards, and communicate insights.',
    skills: [
      { id: 'skill_001', roleId: 'role_data_analyst', skillName: 'SQL', skillType: 'core', importanceLevel: 5 },
      { id: 'skill_002', roleId: 'role_data_analyst', skillName: 'Excel', skillType: 'tool', importanceLevel: 4 },
      { id: 'skill_003', roleId: 'role_data_analyst', skillName: 'Data Visualization', skillType: 'core', importanceLevel: 5 },
    ],
  },
  { id: 'role_data_scientist', roleFamily: 'Data & AI', roleName: 'Data Scientist', description: 'Build models, run experiments, and generate business insights.' },
  { id: 'role_ai_engineer', roleFamily: 'Data & AI', roleName: 'AI Engineer', description: 'Build AI-powered applications and model pipelines.' },
  { id: 'role_ml_engineer', roleFamily: 'Data & AI', roleName: 'ML Engineer', description: 'Train, deploy, and monitor machine learning models.' },
  { id: 'role_backend_developer', roleFamily: 'Software Engineering', roleName: 'Backend Developer', description: 'Build APIs, databases, authentication, and backend systems.' },
]

const questions = [
  'Ceritakan pengalaman project yang paling relevan dengan role Data Analyst.',
  'Tools apa yang kamu gunakan dalam project dashboard tersebut?',
  'Bagaimana kamu memastikan kualitas data sebelum analisis dimulai?',
  'Ceritakan cara kamu menyampaikan insight ke stakeholder non-teknis.',
  'Apa hasil atau impact paling konkret dari project tersebut?',
]

let activeProfile: Profile = createProfileObject('profile_001', 'role_data_analyst')
let activeSession: InterviewSession | null = null

const delay = (ms = 650) => new Promise(resolve => globalThis.setTimeout(resolve, ms))

function ok<TData>(message: string, data: TData): ApiSuccess<TData> {
  return { success: true, message, data }
}

function roleFamilies(): RoleFamily[] {
  return [
    { name: 'Data & AI', roles: roles.filter(role => role.roleFamily === 'Data & AI') },
    { name: 'Software Engineering', roles: roles.filter(role => role.roleFamily === 'Software Engineering') },
  ]
}

function createProfileObject(id: string, targetRoleId: string): Profile {
  return {
    id,
    userId: mockUser.id,
    targetRoleId,
    contextSource: null,
    profileSummary: null,
    skills: [],
    tools: [],
    experienceSummary: null,
    evidenceItems: [],
    initialEvidenceScore: 0,
    createdAt: now,
  }
}

function buildQuestion(session: InterviewSession, index = session.questionIndex): InterviewQuestion {
  return {
    id: `question_${String(index).padStart(3, '0')}`,
    sessionId: session.id,
    questionText: questions[index - 1] ?? questions[questions.length - 1],
    questionType: 'main',
    parentQuestionId: null,
    competencyTarget: index === 1 ? 'role_relevance_and_experience' : 'technical_accuracy',
    clarificationType: null,
    hrdState: 'asking',
  }
}

function mockResult(sessionId: string): InterviewResult {
  return {
    id: 'result_001',
    sessionId,
    finalScore: 78,
    readinessStatus: 'Almost Ready',
    evidenceLevel: 4,
    targetRole: { id: 'role_data_analyst', roleName: 'Data Analyst', roleFamily: 'Data & AI' },
    scoreBreakdown: {
      roleRelevance: 82,
      starStructure: 70,
      evidenceSpecificity: 72,
      technicalAccuracy: 76,
      communicationClarity: 84,
      selfAwareness: 80,
    },
    strengths: [
      { title: 'Role relevance cukup kuat', description: 'Jawaban kamu banyak mengarah ke pengalaman yang relevan dengan Data Analyst.', evidence: 'Kamu menyebut pengalaman membuat dashboard penjualan.' },
      { title: 'Technical awareness sudah terlihat', description: 'Kamu mampu menyebut tools yang sesuai seperti Excel dan Python.', evidence: 'Tools yang terdeteksi: Excel, Python.' },
      { title: 'Komunikasi cukup jelas', description: 'Jawaban mudah dipahami dan tidak terlalu berputar-putar.', evidence: null },
    ],
    improvementAreas: [
      { title: 'Evidence masih bisa diperkuat', description: 'Beberapa jawaban belum menjelaskan hasil atau impact secara konkret.', evidence: 'Belum ada angka atau metrik yang disebutkan.' },
      { title: 'Struktur STAR belum konsisten', description: 'Beberapa jawaban belum lengkap dari sisi Situation, Task, Action, dan Result.', evidence: null },
      { title: 'Technical detail perlu diperdalam', description: 'Kamu sudah menyebut tools, tetapi belum selalu menjelaskan proses penggunaannya.', evidence: null },
    ],
    beforeAfterImprovement: [
      {
        questionText: questions[0],
        beforeAnswer: 'Saya pernah membuat dashboard penjualan.',
        afterAnswer: 'Saya pernah membuat dashboard penjualan menggunakan Excel dan Python. Dalam project tersebut, saya membersihkan data penjualan, membuat visualisasi produk terlaris, dan menyusun insight agar tim lebih mudah memahami performa penjualan.',
        improvementNotes: ['Tools disebutkan', 'Kontribusi pribadi lebih jelas', 'Impact sudah mulai terlihat', 'Masih bisa ditambah angka jika tersedia'],
      },
    ],
    nextPracticeRecommendation: {
      practiceType: 'Evidence Booster Practice',
      reason: 'Jawaban kamu sudah relevan, tetapi masih perlu bukti pengalaman yang lebih kuat dan spesifik.',
      focusAreas: ['Tambahkan tools yang digunakan', 'Jelaskan kontribusi pribadi', 'Sebutkan hasil atau impact', 'Tambahkan angka jika tersedia'],
    },
    createdAt: '2026-05-17T10:30:00.000Z',
  }
}

export const mockRoad2WorkApi = {
  async signup(payload: SignupPayload) {
    await delay()
    return ok('Account created successfully', {
      user: { ...mockUser, name: payload.name, email: payload.email },
      accessToken: 'mock_access_token_road2work',
    })
  },

  async login(payload: LoginPayload) {
    await delay()
    return ok('Login successful', {
      user: { ...mockUser, email: payload.email },
      accessToken: 'mock_access_token_road2work',
    })
  },

  async me() {
    await delay(250)
    return ok('Current user fetched successfully', { user: mockUser })
  },

  async getRoles(roleFamily?: string) {
    await delay(350)
    const families = roleFamily ? roleFamilies().filter(family => family.name === roleFamily) : roleFamilies()
    return ok('Roles fetched successfully', { roleFamilies: families })
  },

  async getRoleDetail(roleId: string) {
    await delay(300)
    return ok('Role detail fetched successfully', { role: roles.find(role => role.id === roleId) ?? roles[0] })
  },

  async createProfile(payload: CreateProfilePayload) {
    await delay()
    activeProfile = createProfileObject('profile_001', payload.targetRoleId)
    return ok('Profile created successfully', { profile: activeProfile })
  },

  async getProfile() {
    await delay(350)
    return ok('Profile fetched successfully', { profile: activeProfile })
  },

  async uploadCv(profileId: string) {
    await delay(1100)
    activeProfile = {
      ...activeProfile,
      id: profileId,
      contextSource: 'cv',
      profileSummary: 'User has experience in data analysis, dashboard creation, and Python-based projects.',
      skills: ['Data Analysis', 'Data Cleaning', 'Data Visualization'],
      tools: ['Excel', 'Python', 'Tableau'],
      experienceSummary: 'Created dashboards and analyzed sales data in academic and freelance projects.',
      evidenceItems: ['Built sales dashboard', 'Cleaned and analyzed datasets', 'Created visual insights for reporting'],
      initialEvidenceScore: 72,
    }
    return ok('CV processed successfully', { profile: activeProfile, extraction: { status: 'success', source: 'cv' } })
  },

  async submitShortProfile(profileId: string, payload: ShortProfilePayload) {
    await delay(1000)
    activeProfile = {
      ...activeProfile,
      id: profileId,
      contextSource: 'short_profile',
      profileSummary: `User has experience: ${payload.mostRelevantExperience}`,
      skills: ['Data Cleaning', 'Data Visualization', 'Data Analysis'],
      tools: payload.skillsAndTools.split(',').map(item => item.trim()).filter(Boolean),
      experienceSummary: payload.projectExperience || 'Created a dashboard and analyzed product performance.',
      evidenceItems: ['Created a sales dashboard', 'Used Excel and Python', 'Helped team understand sales performance'],
      initialEvidenceScore: 70,
    }
    return ok('Short profile processed successfully', { profile: activeProfile, extraction: { status: 'success', source: 'short_profile' } })
  },

  async createSession(payload: CreateSessionPayload) {
    await delay()
    activeSession = {
      id: 'session_001',
      userId: mockUser.id,
      profileId: payload.profileId,
      roleId: payload.roleId,
      status: 'active',
      questionIndex: 1,
      totalMainQuestions: payload.totalMainQuestions ?? 5,
      clarificationCount: 0,
      currentHrdState: 'asking',
      createdAt: now,
      completedAt: null,
    }
    return ok('Interview session created successfully', { session: activeSession, currentQuestion: buildQuestion(activeSession) })
  },

  async submitVoiceAnswer(sessionId: string) {
    await delay(900)
    const session = activeSession ?? {
      id: sessionId,
      userId: mockUser.id,
      profileId: activeProfile.id,
      roleId: activeProfile.targetRoleId,
      status: 'active' as const,
      questionIndex: 1,
      totalMainQuestions: 5,
      clarificationCount: 0,
      currentHrdState: 'asking' as const,
      createdAt: now,
      completedAt: null,
    }
    const isCompleted = session.questionIndex >= session.totalMainQuestions
    activeSession = {
      ...session,
      status: isCompleted ? 'completed' : 'active',
      currentHrdState: isCompleted ? 'completed' : 'asking',
      questionIndex: isCompleted ? session.questionIndex : session.questionIndex + 1,
      completedAt: isCompleted ? '2026-05-17T10:30:00.000Z' : null,
    }

    return ok('Answer evaluated successfully.', {
      answer: {
        id: `answer_${String(session.questionIndex).padStart(3, '0')}`,
        transcriptText: 'Saya pernah membuat dashboard penjualan menggunakan Excel dan Python.',
        answerScore: 72,
        needsClarification: false,
      },
      nextQuestion: isCompleted ? null : buildQuestion(activeSession),
      isCompleted,
      resultId: isCompleted ? 'result_001' : null,
    })
  },

  async getResult(sessionId: string) {
    await delay(450)
    return ok('Interview result fetched successfully', { result: mockResult(sessionId) })
  },

  async getHistory() {
    await delay(300)
    return ok('Interview history fetched successfully', {
      history: [
        {
          sessionId: 'session_001',
          resultId: 'result_001',
          targetRole: 'Data Analyst',
          finalScore: 78,
          readinessStatus: 'Almost Ready',
          createdAt: '2026-05-17T10:30:00.000Z',
        },
      ],
    })
  },
}
