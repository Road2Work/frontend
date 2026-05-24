export const endpoints = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    me: '/auth/me',
  },
  roles: {
    getAll: '/roles',
    getById: (roleId: string) => `/roles/${roleId}`,
  },
  profiles: {
    create: '/profiles',
    getById: (profileId: string) => `/profiles/${profileId}`,
    uploadCv: (profileId: string) => `/profiles/${profileId}/cv`,
    submitContext: (profileId: string) => `/profiles/${profileId}/context`,
  },
  interviews: {
    createSession: '/interviews/sessions',
    getSession: (sessionId: string) => `/interviews/sessions/${sessionId}`,
    submitVoiceAnswer: (sessionId: string) => `/interviews/sessions/${sessionId}/voice-answer`,
    cancelSession: (sessionId: string) => `/interviews/sessions/${sessionId}/cancel`,
    getResult: (sessionId: string) => `/interviews/sessions/${sessionId}/result`,
    history: '/interviews/history',
  },
} as const
