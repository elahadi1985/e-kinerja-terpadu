// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: Role;
  unit_kerja?: UnitKerja;
  created_at: string;
}

export interface Role {
  id: number;
  name: 'super_admin' | 'admin' | 'operator' | 'verifikator' | 'pimpinan' | 'auditor' | 'viewer';
  description: string;
}

export interface Permission {
  id: number;
  name: string;
  module: string;
  action: string;
}

// Master Data Types
export interface UnitKerja {
  id: number;
  kode: string;
  nama: string;
  deskripsi?: string;
  parent_id?: number;
  kepala_unit?: string;
  email?: string;
  is_active: boolean;
}

export interface Pegawai {
  id: number;
  nip: string;
  nama: string;
  email: string;
  unit_kerja_id: number;
  jabatan_id?: number;
  is_active: boolean;
}

export interface Jabatan {
  id: number;
  nama: string;
  kode: string;
  deskripsi?: string;
}

// RENSTRA Types
export interface Renstra {
  id: number;
  unit_kerja_id: number;
  tahun_awal: number;
  tahun_akhir: number;
  visi: string;
  misi: string;
  tujuan?: string;
  status: 'draft' | 'submitted' | 'verified' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

// IKU Types
export interface IKU {
  id: number;
  kode: string;
  nama: string;
  unit_kerja_id: number;
  satuan: string;
  baseline?: number;
  target_tahunan: number;
  target_bulanan?: number;
  bobot: number;
  tahun: number;
  is_active: boolean;
}

// SAKIP Types
export interface SAKIP {
  id: number;
  unit_kerja_id: number;
  tahun: number;
  komponen: string;
  nilai?: number;
  bobot: number;
  persentase: number;
  status: 'draft' | 'submitted' | 'verified' | 'approved';
  catatan?: string;
}

// SPIP Types
export interface SPIPMaturity {
  id: number;
  unit_kerja_id: number;
  tahun: number;
  domain: string;
  sub_domain: string;
  level: number;
  skor: number;
  target_level?: number;
}

// Zona Integritas Types
export interface ZonaIntegritas {
  id: number;
  unit_kerja_id: number;
  tahun: number;
  area_perubahan: string;
  nilai: number;
  progress: number;
  status: 'draft' | 'in_progress' | 'completed';
}

// Monitoring Types
export interface Monitoring {
  id: number;
  unit_kerja_id: number;
  bulan: number;
  tahun: number;
  iku_id: number;
  target: number;
  realisasi: number;
  persentase: number;
  status: 'on_track' | 'at_risk' | 'off_track';
}

// Document Types
export interface Dokumen {
  id: number;
  judul: string;
  kategori: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  versi: number;
  modul: string;
  is_approved: boolean;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordFormData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}
