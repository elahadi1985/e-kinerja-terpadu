export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10);

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Master Data
  MASTER: {
    UNIT_KERJA: '/master/unit-kerja',
    PEGAWAI: '/master/pegawai',
    JABATAN: '/master/jabatan',
    PROGRAM: '/master/program',
    KEGIATAN: '/master/kegiatan',
    TAHUN: '/master/tahun',
    PERIODE: '/master/periode',
  },

  // Dashboard
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
    STATS: '/dashboard/stats',
    CHARTS: '/dashboard/charts',
  },

  // RENSTRA
  RENSTRA: '/renstra',

  // SAKIP
  SAKIP: '/sakip',

  // IKU
  IKU: '/iku',

  // SPIP
  SPIP: '/spip',

  // Zona Integritas
  ZONA_INTEGRITAS: '/zona-integritas',

  // RB
  RB: '/rb',

  // PK
  PK: '/pk',

  // LKjIP
  LKJIP: '/lkjip',

  // Dokumen
  DOKUMEN: '/dokumen',

  // Monitoring
  MONITORING: '/monitoring',

  // Laporan
  LAPORAN: '/laporan',

  // Admin
  ADMIN: {
    USERS: '/admin/users',
    ROLES: '/admin/roles',
    PERMISSIONS: '/admin/permissions',
    AUDIT_LOG: '/admin/audit-log',
  },
};
