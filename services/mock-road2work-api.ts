import type {
  ApiSuccess,
  AdaptivePracticeMemory,
  AdminAnalytics,
  AdminUser,
  CareerReadinessDashboard,
  ConfirmRolePayload,
  CreateDomainPayload,
  CreateProfilePayload,
  CreateRoleFamilyPayload,
  CreateRolePayload,
  CreateSessionPayload,
  Domain,
  GenerateRoleFitRankingPayload,
  InterviewQuestion,
  InterviewResult,
  InterviewSession,
  LegacyRoleFamily,
  LoginPayload,
  ManualProfilePayload,
  Profile,
  Role,
  RoleFamily,
  RoleFitResult,
  RoleFitScorePayload,
  ShortProfilePayload,
  SubmitVoiceAnswerPayload,
  SignupPayload,
  UpdateProfilePayload,
  User,
} from '@/types/api-contract'

const now = '2026-05-17T10:00:00.000Z'

const mockUser: User = {
  id: 'usr_001',
  name: 'Sari Dewi',
  email: 'sari@example.com',
  role: 'user',
  status: 'active',
  freeInterviewQuota: 5,
  usedInterviewCount: 1,
  createdAt: now,
  updatedAt: now,
}

let domains: Domain[] = [
  {
    id: 'domain_it',
    name: 'Information Technology',
    description: 'Data, AI, software, cloud, dan infrastructure.',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  },
]

let roleFamilyRows: RoleFamily[] = [
  { id: 'family_data_ai', domainId: 'domain_it', name: 'Data & AI', description: 'Data, analytics, dan artificial intelligence.', isActive: true, createdAt: now, updatedAt: now },
  { id: 'family_software', domainId: 'domain_it', name: 'Software Engineering', description: 'Frontend, backend, dan full-stack development.', isActive: true, createdAt: now, updatedAt: now },
]

let roles: Role[] = [
  {
    id: 'role_data_analyst',
    domainId: 'domain_it',
    roleFamilyId: 'family_data_ai',
    roleFamily: 'Data & AI',
    name: 'Data Analyst',
    roleName: 'Data Analyst',
    description: 'Analyze data, build dashboards, and communicate insights.',
    coreSkills: ['SQL', 'Data Cleaning', 'Dashboarding', 'Data Storytelling'],
    tools: ['Excel', 'Python', 'Tableau'],
    competencyMap: ['self_introduction', 'skill', 'solution_skill', 'role_relevance_and_evidence', 'communication_clarity'],
    isActive: true,
    createdAt: now,
    updatedAt: now,
    skills: [
      { id: 'skill_001', roleId: 'role_data_analyst', skillName: 'SQL', skillType: 'core', importanceLevel: 5 },
      { id: 'skill_002', roleId: 'role_data_analyst', skillName: 'Excel', skillType: 'tool', importanceLevel: 4 },
      { id: 'skill_003', roleId: 'role_data_analyst', skillName: 'Data Visualization', skillType: 'core', importanceLevel: 5 },
    ],
  },
  { id: 'role_data_scientist', domainId: 'domain_it', roleFamilyId: 'family_data_ai', roleFamily: 'Data & AI', name: 'Data Scientist', roleName: 'Data Scientist', description: 'Build models, run experiments, and generate business insights.', coreSkills: ['Python', 'Statistics', 'Machine Learning'], tools: ['Python', 'Jupyter', 'Scikit-learn'], competencyMap: ['self_introduction', 'skill', 'technical_accuracy', 'solution_skill'], isActive: true, createdAt: now, updatedAt: now },
  { id: 'role_ai_engineer', domainId: 'domain_it', roleFamilyId: 'family_data_ai', roleFamily: 'Data & AI', name: 'AI Engineer', roleName: 'AI Engineer', description: 'Build AI-powered applications and model pipelines.', coreSkills: ['LLM', 'API Integration', 'Prompting'], tools: ['Python', 'FastAPI', 'OpenAI API'], competencyMap: ['self_introduction', 'skill', 'solution_skill', 'technical_accuracy'], isActive: true, createdAt: now, updatedAt: now },
  { id: 'role_ml_engineer', domainId: 'domain_it', roleFamilyId: 'family_data_ai', roleFamily: 'Data & AI', name: 'ML Engineer', roleName: 'ML Engineer', description: 'Train, deploy, and monitor machine learning models.', coreSkills: ['ML Pipeline', 'Model Deployment', 'Monitoring'], tools: ['TensorFlow', 'Docker', 'Python'], competencyMap: ['self_introduction', 'skill', 'technical_accuracy', 'agile_culture'], isActive: true, createdAt: now, updatedAt: now },
  { id: 'role_backend_developer', domainId: 'domain_it', roleFamilyId: 'family_software', roleFamily: 'Software Engineering', name: 'Backend Developer', roleName: 'Backend Developer', description: 'Build APIs, databases, authentication, and backend systems.', coreSkills: ['REST API', 'Database', 'Authentication'], tools: ['Node.js', 'PostgreSQL', 'Express'], competencyMap: ['self_introduction', 'skill', 'solution_skill', 'agile_culture'], isActive: true, createdAt: now, updatedAt: now },
]

const questions = [
  'Sebelum masuk ke pertanyaan teknis, silakan perkenalkan diri kamu dan ceritakan singkat pengalaman yang paling relevan dengan target role.',
  'Ceritakan satu pengalaman ketika kamu menggunakan data atau tools untuk mengambil keputusan. Jelaskan kontribusi pribadi dan dampaknya.',
  'Ceritakan situasi ketika kamu harus belajar hal baru untuk menyelesaikan masalah project. Bagaimana proses belajarmu?',
  'Bagaimana kamu bekerja dalam tim ketika prioritas berubah cepat, dan apa keputusan yang kamu ambil?',
  'Apa gap terbesar yang masih kamu sadari untuk role target ini, dan bagaimana rencana memperbaikinya?',
]

const adaptiveMemory: AdaptivePracticeMemory = {
  enabled: true,
  previousSessionIds: ['session_000'],
  previousInterviewSummary: 'User cukup jelas berkomunikasi, tetapi evidence dan struktur STAR masih perlu diperkuat.',
  previousScoreBreakdown: {
    roleRelevance: 72,
    starStructure: 58,
    evidenceSpecificity: 55,
    technicalAccuracy: 70,
    communicationClarity: 80,
    selfAwareness: 68,
  },
  previousDetectedWeaknesses: ['weak_evidence', 'weak_star_structure', 'missing_impact'],
  previousEvidenceLevels: [3, 4],
  askedQuestionHistory: [
    {
      questionId: 'question_old_001',
      questionText: 'Ceritakan pengalamanmu membuat dashboard.',
      questionType: 'main',
      competencyTarget: 'role_relevance_and_evidence',
      askedAt: '2026-05-14T14:20:00.000Z',
    },
  ],
  latestInterviewFeedback: 'Tambahkan tools, kontribusi pribadi, dan impact terukur.',
  nextBestActions: [
    { id: 'nba_memory_1', title: 'Latih struktur STAR', description: 'Fokus pada situation, task, action, result.', impactLabel: 'Tinggi', impactScoreText: '+8 Interview Readiness', actionType: 'practice_interview' },
  ],
  improvementFocus: ['evidence_specificity', 'star_structure'],
  avoidRepeatedQuestions: true,
  retryMode: false,
}

let selectedRoleId = 'role_data_analyst'
let activeProfile: Profile = createProfileObject('profile_001', selectedRoleId)
let activeSession: InterviewSession | null = null

const adminUsers: AdminUser[] = [
  mockUser,
  {
    id: 'usr_002',
    name: 'Rizky Pratama',
    email: 'rizky@example.com',
    role: 'user',
    status: 'active',
    freeInterviewQuota: 5,
    usedInterviewCount: 3,
    createdAt: '2026-05-18T08:30:00.000Z',
  },
  {
    id: 'adm_001',
    name: 'Road2Work Admin',
    email: 'admin@road2work.id',
    role: 'admin',
    status: 'active',
    freeInterviewQuota: 0,
    usedInterviewCount: 0,
    createdAt: '2026-05-10T09:00:00.000Z',
  },
]

const delay = (ms = 650) => new Promise(resolve => globalThis.setTimeout(resolve, ms))

function ok<TData>(message: string, data: TData): ApiSuccess<TData> {
  return { success: true, message, data }
}

function roleFamilies(): LegacyRoleFamily[] {
  return [
    { name: 'Data & AI', roles: roles.filter(role => role.roleFamily === 'Data & AI') },
    { name: 'Software Engineering', roles: roles.filter(role => role.roleFamily === 'Software Engineering') },
  ]
}

function createProfileObject(id: string, targetRoleId: string): Profile {
  return {
    id,
    userId: mockUser.id,
    source: 'manual',
    targetRoleId,
    selectedRoleId: targetRoleId,
    contextSource: null,
    professionalSummary: '',
    profileSummary: null,
    skills: [],
    tools: [],
    skillEvidence: [],
    achievementSignals: [],
    experienceSummary: null,
    evidenceScore: 0,
    evidenceItems: [],
    profileCompleteness: 0,
    aiConfidence: 0,
    status: 'draft',
    initialEvidenceScore: 0,
    createdAt: now,
    updatedAt: now,
  }
}

function buildRoleFit(roleId: string, rank: number | null, fitScore: number): RoleFitResult {
  const role = roles.find(item => item.id === roleId) ?? roles[0]
  return {
    id: `role_fit_${role.id}`,
    profileId: activeProfile.id,
    roleId: role.id,
    roleName: role.roleName,
    fitScore,
    rank,
    reason: `${role.roleName} cocok karena profil kamu menunjukkan kombinasi skill, tools, dan evidence yang relevan.`,
    strengths: ['Skill utama mulai terlihat', 'Tools yang disebutkan relevan', 'Pengalaman project bisa diarahkan ke role ini'],
    gaps: ['Tambahkan impact terukur', 'Perjelas kontribusi pribadi', 'Lengkapi bukti per skill'],
    skillOverlap: {
      matched: 3,
      total: 5,
      matchedSkills: role.coreSkills?.slice(0, 3) ?? ['SQL', 'Data Analysis', 'Storytelling'],
      missingSkills: ['Impact Measurement', 'Stakeholder Communication'],
    },
    createdAt: now,
  }
}

function getSessionQuestionIndex(session: InterviewSession) {
  return session.currentQuestionIndex ?? session.questionIndex ?? 1
}

function getSessionQuestionCount(session: InterviewSession) {
  return session.questionCount ?? session.totalMainQuestions ?? 3
}

function getSessionState(session: InterviewSession) {
  return session.currentState ?? session.currentHrdState ?? 'asking'
}

function buildQuestion(session: InterviewSession, index = getSessionQuestionIndex(session)): InterviewQuestion {
  return {
    id: `question_${String(index).padStart(3, '0')}`,
    sessionId: session.id,
    questionText: questions[index - 1] ?? questions[questions.length - 1],
    questionType: 'main',
    parentQuestionId: null,
    competencyTarget: index === 1 ? 'self_introduction' : index === 2 ? 'skill' : index === 3 ? 'interest_need_of_learning' : 'agile_culture',
    clarificationType: null,
    generatedFrom: index === 1 ? 'role_context' : 'weakness_history',
    hrdState: 'asking',
  }
}

function buildClarifyingQuestion(session: InterviewSession): InterviewQuestion {
  const index = getSessionQuestionIndex(session)
  return {
    id: `question_${String(index).padStart(3, '0')}_clarification`,
    sessionId: session.id,
    questionText: 'Kamu menyebut project itu berdampak. Bisa jelaskan tools yang dipakai, bagian yang kamu kerjakan sendiri, dan hasil konkretnya?',
    questionType: 'clarification',
    parentQuestionId: `question_${String(index).padStart(3, '0')}`,
    competencyTarget: 'evidence_specificity',
    clarificationType: 'weak_evidence',
    generatedFrom: 'weakness_history',
    hrdState: 'clarifying',
  }
}

function mockResult(sessionId: string): InterviewResult {
  const role = roles.find(item => item.id === selectedRoleId) ?? roles[0]
  return {
    id: 'result_001',
    sessionId,
    finalScore: 78,
    interviewReadinessScore: 78,
    readinessStatus: 'Almost Ready',
    summary: 'Komunikasi sudah cukup jelas, tetapi struktur STAR dan evidence perlu dibuat lebih konsisten.',
    evidenceLevel: 4,
    selectedRole: { id: role.id, name: role.roleName },
    targetRole: { id: role.id, roleName: role.roleName, roleFamily: role.roleFamily ?? 'Data & AI' },
    scoreBreakdown: {
      roleRelevance: 82,
      starStructure: 70,
      evidenceSpecificity: 72,
      technicalAccuracy: 76,
      communicationClarity: 84,
      selfAwareness: 80,
    },
    strengths: [
      { title: 'Role relevance cukup kuat', description: 'Jawaban kamu banyak mengarah ke pengalaman yang relevan dengan target role.', evidence: 'Kamu menyebut pengalaman membuat dashboard atau project relevan.' },
      { title: 'Technical awareness sudah terlihat', description: 'Kamu mampu menyebut tools yang sesuai.', evidence: 'Tools yang terdeteksi dari profil dan jawaban.' },
      { title: 'Komunikasi cukup jelas', description: 'Jawaban mudah dipahami dan tidak terlalu berputar-putar.', evidence: null },
    ],
    improvementAreas: [
      { title: 'Evidence masih bisa diperkuat', description: 'Beberapa jawaban belum menjelaskan hasil atau impact secara konkret.', evidence: 'Belum ada angka atau metrik yang konsisten.' },
      { title: 'Struktur STAR belum konsisten', description: 'Beberapa jawaban belum lengkap dari sisi Situation, Task, Action, dan Result.', evidence: null },
    ],
    beforeAfterImprovement: [
      {
        questionText: questions[0],
        beforeAnswer: 'Saya pernah membuat dashboard penjualan.',
        afterAnswer: 'Saya pernah membuat dashboard penjualan menggunakan Excel dan Python. Saya membersihkan data, membuat visualisasi produk terlaris, dan menyusun insight agar tim memahami performa penjualan.',
        improvementNotes: ['Tools disebutkan', 'Kontribusi pribadi lebih jelas', 'Impact masih bisa ditambah angka'],
      },
    ],
    nextPracticeRecommendation: {
      practiceType: 'Evidence Booster Practice',
      reason: 'Jawaban kamu sudah relevan, tetapi masih perlu bukti pengalaman yang lebih kuat dan spesifik.',
      focusAreas: ['Tambahkan tools yang digunakan', 'Jelaskan kontribusi pribadi', 'Sebutkan hasil atau impact'],
    },
    adaptiveSessionSuggestion: {
      recommendedFocus: ['star_structure', 'evidence_specificity'],
      avoidRepeatedQuestions: true,
      suggestedPracticeMode: 'adaptive_from_history',
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
    const isAdmin = payload.email.toLowerCase() === 'admin@road2work.id'
    const user = isAdmin
      ? adminUsers.find(item => item.role === 'admin') ?? { ...mockUser, role: 'admin' as const }
      : { ...mockUser, email: payload.email }

    return ok('Login successful', {
      user,
      accessToken: 'mock_access_token_road2work',
    })
  },

  async me() {
    await delay(250)
    return ok('Current user fetched successfully', { user: mockUser })
  },

  async getDomains() {
    await delay(250)
    return ok('Domains fetched successfully', { domains })
  },

  async getRoleFamilies(domainId?: string) {
    await delay(250)
    return ok('Role families fetched successfully', {
      roleFamilies: domainId ? roleFamilyRows.filter(family => family.domainId === domainId) : roleFamilyRows,
    })
  },

  async getRoles(roleFamily?: string) {
    await delay(350)
    const families = roleFamily ? roleFamilies().filter(family => family.name === roleFamily) : roleFamilies()
    return ok('Roles fetched successfully', { roleFamilies: families })
  },

  async getRolesByFamily(roleFamilyId?: string) {
    await delay(300)
    return ok('Roles fetched successfully', {
      roles: roleFamilyId ? roles.filter(role => role.roleFamilyId === roleFamilyId) : roles,
    })
  },

  async getRoleDetail(roleId: string) {
    await delay(300)
    return ok('Role detail fetched successfully', { role: roles.find(role => role.id === roleId) ?? roles[0] })
  },

  async createProfile(payload: CreateProfilePayload) {
    await delay()
    selectedRoleId = payload.targetRoleId
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
      source: 'cv',
      contextSource: 'cv',
      professionalSummary: 'Memiliki pengalaman data analysis, dashboarding, dan project berbasis Python.',
      profileSummary: 'Memiliki pengalaman data analysis, dashboarding, dan project berbasis Python.',
      skills: ['Data Analysis', 'Data Cleaning', 'Data Visualization'],
      tools: ['Excel', 'Python', 'Tableau'],
      skillEvidence: [
        { skillName: 'Data Analysis', evidenceText: 'Menganalisis data penjualan untuk dashboard insight.', evidenceLevel: 4, source: 'cv' },
        { skillName: 'Data Visualization', evidenceText: 'Membuat dashboard performa penjualan.', evidenceLevel: 4, source: 'cv' },
      ],
      achievementSignals: ['Dashboard membantu tim memahami performa penjualan mingguan'],
      experienceSummary: 'Created dashboards and analyzed sales data in academic and freelance projects.',
      evidenceScore: 72,
      evidenceItems: ['Built sales dashboard', 'Cleaned and analyzed datasets', 'Created visual insights for reporting'],
      profileCompleteness: 76,
      aiConfidence: 0.88,
      status: 'draft',
      initialEvidenceScore: 72,
      updatedAt: now,
    }
    return ok('CV processed successfully', { profile: activeProfile, extraction: { status: 'success', source: 'cv' } })
  },

  async uploadCvForExtraction(formData: FormData) {
    void formData
    activeProfile = createProfileObject('profile_cv_001', selectedRoleId)
    return this.uploadCv(activeProfile.id)
  },

  async submitShortProfile(profileId: string, payload: ShortProfilePayload) {
    return this.createManualProfile({
      domainId: 'domain_it',
      roleFamilyId: 'family_data_ai',
      targetRoleId: selectedRoleId,
      mostRelevantExperience: payload.mostRelevantExperience,
      skillsAndTools: payload.skillsAndTools,
      projectExperience: payload.projectExperience,
      achievementOrImpact: payload.achievementOrImpact,
    }).then(response => ok('Short profile processed successfully', { profile: { ...response.data.profile, id: profileId }, extraction: { status: 'success', source: 'short_profile' } }))
  },

  async createManualProfile(payload: ManualProfilePayload) {
    await delay(1000)
    selectedRoleId = payload.targetRoleId
    const skills = payload.skillsAndTools.split(',').map(item => item.trim()).filter(Boolean)
    activeProfile = {
      ...createProfileObject('profile_manual_001', payload.targetRoleId),
      source: 'manual',
      selectedRoleId: payload.targetRoleId,
      contextSource: 'short_profile',
      professionalSummary: `Memiliki pengalaman relevan: ${payload.mostRelevantExperience}`,
      profileSummary: `Memiliki pengalaman relevan: ${payload.mostRelevantExperience}`,
      skills,
      tools: skills.slice(0, 4),
      skillEvidence: [
        {
          skillName: skills[0] || 'Problem Solving',
          evidenceText: payload.projectExperience || payload.mostRelevantExperience,
          evidenceLevel: 3,
          source: 'manual',
        },
      ],
      achievementSignals: payload.achievementOrImpact ? [payload.achievementOrImpact] : [],
      experienceSummary: payload.projectExperience || payload.mostRelevantExperience,
      evidenceItems: [payload.projectExperience || payload.mostRelevantExperience],
      evidenceScore: 68,
      initialEvidenceScore: 68,
      profileCompleteness: 72,
      aiConfidence: 0.82,
      status: 'draft',
      updatedAt: now,
    }
    return ok('Manual profile processed successfully', { profile: activeProfile, extraction: { status: 'success', source: 'manual' } })
  },

  async updateProfile(profileId: string, payload: UpdateProfilePayload) {
    await delay(500)
    activeProfile = {
      ...activeProfile,
      id: profileId,
      professionalSummary: payload.professionalSummary ?? activeProfile.professionalSummary,
      profileSummary: payload.professionalSummary ?? activeProfile.profileSummary,
      skills: payload.skills ?? activeProfile.skills,
      tools: payload.tools ?? activeProfile.tools,
      skillEvidence: payload.skillEvidence ?? activeProfile.skillEvidence,
      achievementSignals: payload.achievementSignals ?? activeProfile.achievementSignals,
      status: 'reviewed',
      updatedAt: now,
    }
    return ok('Profile updated successfully', { profile: activeProfile })
  },

  async confirmProfile(profileId: string) {
    await delay(450)
    activeProfile = { ...activeProfile, id: profileId, status: 'confirmed', updatedAt: now }
    return ok('Profile confirmed successfully', { profile: activeProfile })
  },

  async generateRoleFitRanking(payload: GenerateRoleFitRankingPayload) {
    void payload
    await delay(900)
    return ok('Role fit ranking generated successfully', {
      recommendations: [
        buildRoleFit('role_data_analyst', 1, 89),
        buildRoleFit('role_data_scientist', 2, 82),
        buildRoleFit('role_ai_engineer', 3, 76),
      ],
    })
  },

  async calculateRoleFitScore(payload: RoleFitScorePayload) {
    await delay(500)
    return ok('Role fit score calculated successfully', { roleFit: buildRoleFit(payload.roleId, null, 84) })
  },

  async confirmRole(payload: ConfirmRolePayload) {
    await delay(400)
    selectedRoleId = payload.roleId
    activeProfile = { ...activeProfile, selectedRoleId: payload.roleId, targetRoleId: payload.roleId, updatedAt: now }
    return ok('Selected role confirmed successfully', { selectedRoleId: payload.roleId, roleFit: buildRoleFit(payload.roleId, null, 84) })
  },

  async createSession(payload: CreateSessionPayload) {
    await delay()
    const questionCount = payload.questionCount ?? payload.totalMainQuestions ?? 3
    const practiceMode = payload.practiceMode ?? (mockUser.usedInterviewCount ? 'adaptive_from_history' : 'first_session')
    activeSession = {
      id: 'session_001',
      userId: mockUser.id,
      profileId: payload.profileId,
      roleId: payload.roleId ?? payload.selectedRoleId ?? selectedRoleId,
      selectedRoleId: payload.roleId ?? payload.selectedRoleId ?? selectedRoleId,
      status: 'active',
      questionIndex: 1,
      totalMainQuestions: questionCount,
      questionCount,
      currentQuestionIndex: 1,
      clarificationCount: 0,
      maxClarification: 3,
      currentHrdState: 'asking',
      currentState: 'asking',
      recordingPolicy: {
        autoStartMic: true,
        autoStartTrigger: 'after_hrd_question_finished',
        answerLimitSeconds: 90,
        silenceAutoStopEnabled: false,
        userCanStopBeforeLimit: true,
        stopReasons: ['user_mic_off', 'timer_timeout'],
        audioFormat: 'webm',
      },
      practiceMode,
      adaptiveMemory: practiceMode === 'first_session' ? { ...adaptiveMemory, enabled: false, previousSessionIds: [], previousDetectedWeaknesses: [], askedQuestionHistory: [], improvementFocus: [] } : adaptiveMemory,
      createdAt: now,
      startedAt: now,
      completedAt: null,
    }
    return ok('Interview session created successfully', {
      session: activeSession,
      adaptiveMemory: activeSession.adaptiveMemory,
      currentQuestion: buildQuestion(activeSession),
      quota: {
        freeInterviewQuota: mockUser.freeInterviewQuota ?? 5,
        usedInterviewCount: mockUser.usedInterviewCount ?? 1,
        remainingInterviewCount: Math.max(0, (mockUser.freeInterviewQuota ?? 5) - (mockUser.usedInterviewCount ?? 1)),
      },
    })
  },

  async getQuota() {
    await delay(250)
    const freeInterviewQuota = mockUser.freeInterviewQuota ?? 5
    const usedInterviewCount = mockUser.usedInterviewCount ?? 1
    return ok('Interview quota fetched successfully', {
      freeInterviewQuota,
      usedInterviewCount,
      remainingQuota: Math.max(0, freeInterviewQuota - usedInterviewCount),
    })
  },

  async submitVoiceAnswer(sessionId: string, payload?: FormData | SubmitVoiceAnswerPayload) {
    void payload
    await delay(900)
    const session = activeSession ?? {
      id: sessionId,
      userId: mockUser.id,
      profileId: activeProfile.id,
      roleId: selectedRoleId,
      selectedRoleId,
      status: 'active' as const,
      questionIndex: 1,
      totalMainQuestions: 3,
      questionCount: 3,
      currentQuestionIndex: 1,
      clarificationCount: 0,
      currentHrdState: 'asking' as const,
      currentState: 'asking' as const,
      createdAt: now,
      completedAt: null,
    }
    const questionIndex = getSessionQuestionIndex(session)
    const currentState = getSessionState(session)
    const shouldClarify =
      currentState !== 'clarifying' &&
      questionIndex === 1 &&
      session.clarificationCount < 1

    if (shouldClarify) {
      activeSession = {
        ...session,
        currentHrdState: 'clarifying',
        currentState: 'clarifying',
        clarificationCount: session.clarificationCount + 1,
      }

      return ok('Answer evaluated. Clarification needed.', {
        answer: {
          id: `answer_${String(questionIndex).padStart(3, '0')}`,
          sessionId,
          questionId: `question_${String(questionIndex).padStart(3, '0')}`,
          questionType: 'main',
          transcriptText: 'Saya pernah membuat dashboard penjualan.',
          sttConfidence: 0.91,
          answerScore: 55,
          evidenceLevel: 3,
          detectedWeaknesses: ['missing_tools', 'missing_impact', 'weak_evidence'],
          needsClarification: true,
          clarificationType: 'weak_evidence',
          feedback: 'Jawabanmu sudah relevan, tetapi masih perlu detail tools, kontribusi pribadi, dan dampak.',
          strongerAnswer: 'Jawaban ini akan lebih kuat jika kamu menambahkan tools yang digunakan, proses yang kamu lakukan, dan dampaknya.',
        },
        nextQuestion: buildClarifyingQuestion(activeSession),
        session: {
          id: activeSession.id,
          currentState: 'clarifying',
          currentQuestionIndex: questionIndex,
          clarificationCount: activeSession.clarificationCount,
        },
        isCompleted: false,
        resultId: null,
      })
    }

    const isCompleted = questionIndex >= getSessionQuestionCount(session)
    activeSession = {
      ...session,
      status: isCompleted ? 'completed' : 'active',
      currentHrdState: isCompleted ? 'completed' : 'asking',
      currentState: isCompleted ? 'completed' : 'asking',
      questionIndex: isCompleted ? questionIndex : questionIndex + 1,
      currentQuestionIndex: isCompleted ? questionIndex : questionIndex + 1,
      completedAt: isCompleted ? '2026-05-17T10:30:00.000Z' : null,
    }

    return ok('Answer evaluated successfully.', {
      answer: {
        id: `answer_${String(questionIndex).padStart(3, '0')}`,
        sessionId,
        questionId: `question_${String(questionIndex).padStart(3, '0')}`,
        questionType: currentState === 'clarifying' ? 'clarification' : 'main',
        transcriptText: 'Saya pernah membuat dashboard penjualan menggunakan Excel dan Python.',
        sttConfidence: 0.94,
        answerScore: 72,
        evidenceLevel: 4,
        detectedWeaknesses: isCompleted ? ['weak_star_structure'] : [],
        needsClarification: false,
      },
      nextQuestion: isCompleted ? null : buildQuestion(activeSession),
      session: {
        id: activeSession.id,
        status: activeSession.status,
        currentState: activeSession.currentState,
        currentQuestionIndex: activeSession.currentQuestionIndex,
        clarificationCount: activeSession.clarificationCount,
        completedAt: activeSession.completedAt,
      },
      isCompleted,
      resultId: isCompleted ? 'result_001' : null,
      dashboardUpdated: isCompleted,
      adaptiveMemoryUpdated: isCompleted,
    })
  },

  async getPracticeMemory(params: { profileId: string; roleId: string }) {
    void params
    await delay(300)
    return ok('Practice memory fetched successfully', { adaptiveMemory })
  },

  async getResult(sessionId: string) {
    await delay(450)
    return ok('Interview result fetched successfully', { result: mockResult(sessionId) })
  },

  async getDashboard() {
    await delay(350)
    const role = roles.find(item => item.id === selectedRoleId) ?? roles[0]
    const dashboard: CareerReadinessDashboard = {
      user: { id: mockUser.id, name: mockUser.name, email: mockUser.email, status: 'active' },
      profileId: activeProfile.id,
      selectedRole: { id: role.id, name: role.roleName },
      careerReadinessScore: 82,
      readinessStatus: 'Hampir siap',
      scoreMessage: `Kamu 82% siap untuk melamar ${role.roleName}.`,
      evidenceScore: activeProfile.evidenceScore ?? activeProfile.initialEvidenceScore,
      roleFitScore: 84,
      interviewReadinessScore: 78,
      profileCompletenessScore: activeProfile.profileCompleteness ?? 72,
      nextBestActions: [
        { id: 'nba_1', title: 'Perkuat evidence', description: 'Tambahkan angka, skala, atau hasil konkret pada pengalaman utama.', impactLabel: 'Tinggi', impactScoreText: '+8 Evidence Score', actionType: 'add_evidence' },
        { id: 'nba_2', title: 'Latih struktur STAR', description: 'Ulangi satu sesi interview dengan fokus Situation, Task, Action, Result.', impactLabel: 'Tinggi', impactScoreText: '+8 Interview Readiness', actionType: 'practice_interview' },
        { id: 'nba_3', title: 'Tinjau role alternatif', description: 'Bandingkan kecocokan dengan role rekomendasi lain.', impactLabel: 'Sedang', impactScoreText: '+4 Role Fit', actionType: 'review_role_fit' },
      ],
      strengths: ['Komunikasi cukup jelas', 'Role relevance sudah terlihat', 'Tools utama mulai relevan'],
      gaps: ['Impact belum selalu terukur', 'Struktur STAR belum konsisten', 'Bukti per skill perlu ditambah'],
      profileSummary: activeProfile.professionalSummary || activeProfile.profileSummary || 'Profil profesional sudah dibuat dari data awal.',
      roleRecommendation: buildRoleFit(role.id, null, 84),
      latestInterviewFeedback: {
        sessionId: activeSession?.id ?? 'session_001',
        score: 78,
        summary: 'Jawaban sudah relevan, tetapi evidence dan struktur STAR perlu dibuat lebih konsisten.',
        completedAt: '2026-05-17T10:30:00.000Z',
      },
      adaptiveInterviewInsight: {
        lastWeaknesses: ['weak_star_structure', 'weak_evidence'],
        recommendedFocus: ['star_structure', 'evidence_specificity'],
        avoidRepeatedQuestions: true,
      },
      activityTimeline: [
        { id: 'act_1', title: 'Profile dikonfirmasi', description: 'Professional profile siap dipakai untuk interview context.', createdAt: now },
        { id: 'act_2', title: 'Interview selesai', description: 'Dashboard readiness diperbarui dari hasil latihan terakhir.', createdAt: '2026-05-17T10:30:00.000Z' },
      ],
      canDownloadSummary: false,
      downloadRequirement: 'Tersedia saat skor >= 90',
      updatedAt: now,
    }
    return ok('Dashboard fetched successfully', { dashboard })
  },

  async downloadCareerSummary() {
    await delay(250)
    return ok('Career summary download checked successfully', {
      downloadUrl: '',
      locked: true,
      message: 'Career summary terkunci sampai Career Readiness Score mencapai 90+.',
    })
  },

  async getHistory(params?: { profileId?: string; roleId?: string }) {
    void params
    await delay(300)
    return ok('Interview history fetched successfully', {
      history: [
        {
          sessionId: 'session_001',
          resultId: 'result_001',
          targetRole: roles.find(item => item.id === selectedRoleId)?.roleName ?? 'Data Analyst',
          finalScore: 78,
          readinessStatus: 'Almost Ready',
          createdAt: '2026-05-17T10:30:00.000Z',
        },
        {
          sessionId: 'session_002',
          resultId: 'result_002',
          targetRole: 'Backend Developer',
          finalScore: 72,
          readinessStatus: 'Almost Ready',
          createdAt: '2026-05-14T14:20:00.000Z',
        },
        {
          sessionId: 'session_003',
          resultId: 'result_003',
          targetRole: 'Data Scientist',
          finalScore: 61,
          readinessStatus: 'Needs Practice',
          createdAt: '2026-05-11T09:10:00.000Z',
        },
      ],
    })
  },

  async getAdminUsers() {
    await delay(300)
    return ok('Admin users fetched successfully', { users: adminUsers })
  },

  async getAdminAnalytics() {
    await delay(320)
    const analytics: AdminAnalytics = {
      totalUsers: 128,
      activeUsers: 96,
      totalCompletedInterviews: 214,
      totalCvUploaded: 73,
      totalManualProfiles: 55,
      averageCareerReadinessScore: 78,
      averageEvidenceScore: 71,
      mostSelectedRoles: [
        { roleName: 'Data Analyst', count: 42 },
        { roleName: 'Backend Developer', count: 29 },
        { roleName: 'AI Engineer', count: 18 },
      ],
      mostCommonWeaknesses: [
        { weakness: 'weak_star_structure', count: 64 },
        { weakness: 'missing_impact', count: 51 },
        { weakness: 'missing_tools', count: 39 },
      ],
      cvUploadVsManualProfileRatio: { cv: 57, manual: 43 },
      interviewCompletionRate: 86,
    }
    return ok('Admin analytics fetched successfully', { analytics })
  },

  async createAdminDomain(payload: CreateDomainPayload) {
    await delay(280)
    const domain: Domain = {
      id: `domain_${payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`,
      name: payload.name,
      description: payload.description,
      isActive: payload.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    }
    domains = [...domains, domain]
    return ok('Domain created successfully', { domain })
  },

  async updateAdminDomain(id: string, payload: Partial<CreateDomainPayload>) {
    await delay(260)
    domains = domains.map(domain => (domain.id === id ? { ...domain, ...payload, updatedAt: now } : domain))
    return ok('Domain updated successfully', { domain: domains.find(domain => domain.id === id) ?? domains[0] })
  },

  async deleteAdminDomain(id: string) {
    await delay(240)
    domains = domains.map(domain => (domain.id === id ? { ...domain, isActive: false, updatedAt: now } : domain))
    return ok('Domain disabled successfully', { id })
  },

  async createAdminRoleFamily(payload: CreateRoleFamilyPayload) {
    await delay(280)
    const roleFamily: RoleFamily = {
      id: `family_${payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`,
      domainId: payload.domainId,
      name: payload.name,
      description: payload.description,
      isActive: payload.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    }
    roleFamilyRows = [...roleFamilyRows, roleFamily]
    return ok('Role family created successfully', { roleFamily })
  },

  async updateAdminRoleFamily(id: string, payload: Partial<CreateRoleFamilyPayload>) {
    await delay(260)
    roleFamilyRows = roleFamilyRows.map(roleFamily => (roleFamily.id === id ? { ...roleFamily, ...payload, updatedAt: now } : roleFamily))
    return ok('Role family updated successfully', { roleFamily: roleFamilyRows.find(roleFamily => roleFamily.id === id) ?? roleFamilyRows[0] })
  },

  async deleteAdminRoleFamily(id: string) {
    await delay(240)
    roleFamilyRows = roleFamilyRows.map(roleFamily => (roleFamily.id === id ? { ...roleFamily, isActive: false, updatedAt: now } : roleFamily))
    return ok('Role family disabled successfully', { id })
  },

  async createAdminRole(payload: CreateRolePayload) {
    await delay(280)
    const roleFamily = roleFamilyRows.find(item => item.id === payload.roleFamilyId)
    const role: Role = {
      id: `role_${payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`,
      domainId: payload.domainId,
      roleFamilyId: payload.roleFamilyId,
      roleFamily: roleFamily?.name,
      name: payload.name,
      roleName: payload.name,
      description: payload.description,
      coreSkills: payload.coreSkills,
      tools: payload.tools,
      competencyMap: payload.competencyMap,
      isActive: payload.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    }
    roles = [...roles, role]
    return ok('Role created successfully', { role })
  },

  async updateAdminRole(id: string, payload: Partial<CreateRolePayload>) {
    await delay(260)
    roles = roles.map(role =>
      role.id === id
        ? {
            ...role,
            ...payload,
            roleName: payload.name ?? role.roleName,
            name: payload.name ?? role.name,
            updatedAt: now,
          }
        : role,
    )
    return ok('Role updated successfully', { role: roles.find(role => role.id === id) ?? roles[0] })
  },

  async updateAdminRoleCompetencyMap(id: string, payload: { competencyMap: Role['competencyMap'] }) {
    await delay(260)
    roles = roles.map(role => (role.id === id ? { ...role, competencyMap: payload.competencyMap, updatedAt: now } : role))
    return ok('Role competency map updated successfully', { role: roles.find(role => role.id === id) ?? roles[0] })
  },

  async deleteAdminRole(id: string) {
    await delay(240)
    roles = roles.map(role => (role.id === id ? { ...role, isActive: false, updatedAt: now } : role))
    return ok('Role disabled successfully', { id })
  },
}
