# 🏛️ e-Kinerja Terpadu

**Sistem Pengumpulan, Pengelolaan, Monitoring, Evaluasi, dan Pelaporan Data Manajemen Kinerja Pemerintah Terpadu**

[![GitHub License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com)

## 📋 Tentang Aplikasi

e-Kinerja Terpadu adalah sistem informasi manajemen kinerja pemerintah yang mengintegrasikan:

- **SAKIP** - Sistem Akuntabilitas Kinerja Instansi Pemerintah
- **RENSTRA** - Rencana Strategis
- **IKU** - Indikator Kinerja Utama
- **SPIP** - Sistem Pengendalian Internal Pemerintah
- **Zona Integritas** - Program Zona Integritas WBK/WBBM
- **RB** - Rencana Bisnis
- **PK** - Perjanjian Kinerja
- **LKjIP** - Laporan Kinerja Instansi Pemerintah
- **Monitoring & Evaluasi** - Pelaporan Kinerja Organisasi

## 🎯 Fitur Utama

### Dashboard & Analytics
- 📊 Dashboard interaktif seperti Microsoft Power BI
- 📈 Multiple chart types (Line, Bar, Pie, Radar, Gauge, Heatmap)
- 🎨 Glassmorphism design dengan soft shadows
- 🌙 Dark Mode & Light Mode
- 📱 Fully responsive (Desktop, Tablet, Mobile)

### Modul Utama
- 🗂️ Master Data Management
- 📝 RENSTRA (Rencana Strategis)
- 📊 SAKIP (Akuntabilitas Kinerja)
- 🎯 IKU (Indikator Kinerja Utama)
- 🏆 Maturity Rating SPIP
- 🛡️ Zona Integritas
- 🚀 Roadmap Bisnis
- 📋 Perjanjian Kinerja
- 📄 LKjIP (Laporan Kinerja)
- 📁 Document Management

### Workflow & Approval
- ✍️ Draft → Submitted → Verified → Approved
- 🔄 Revision & Rejection workflow
- 📋 Audit Trail & Activity Log
- 🔐 Role-based Access Control

### Fitur Canggih
- 🔍 Global Search & Advanced Filtering
- 🤖 AI-powered insights & recommendations
- 📧 Multi-channel notifications (Email, WhatsApp, Push)
- 📊 Export ke PDF, Excel, Word, CSV
- 🔐 Enterprise-grade security
- 🔄 Real-time synchronization

## 🏗️ Arsitektur Teknologi

### Frontend
```
Next.js 15 + React 19 + TypeScript
Tailwind CSS + Shadcn UI
Framer Motion (Animations)
Recharts (Data Visualization)
React Hook Form + Zod (Forms)
```

### Backend
```
Laravel 12 REST API (atau NestJS)
PostgreSQL Database
JWT + OAuth2 Authentication
MinIO / AWS S3 Storage
```

### DevOps
```
Docker & Docker Compose
GitHub Actions (CI/CD)
Automated Testing & Linting
```

## 📁 Struktur Project

```
e-kinerja-terpadu/
├── frontend/                 # Next.js Application
│   ├── app/
│   │   ├── (auth)/          # Login & Authentication
│   │   ├── dashboard/       # Dashboard & Analytics
│   │   ├── master/          # Master Data Management
│   │   ├── renstra/         # RENSTRA Module
│   │   ├── sakip/           # SAKIP Module
│   │   ├── iku/             # IKU Module
│   │   ├── spip/            # Maturity Rating SPIP
│   │   ├── zona-integritas/ # Zona Integritas
│   │   ├── rb/              # Roadmap Bisnis
│   │   ├── pk/              # Perjanjian Kinerja
│   │   ├── lkjip/           # LKjIP Module
│   │   ├── dokumen/         # Document Management
│   │   ├── monitoring/      # Monitoring & Evaluasi
│   │   ├── laporan/         # Reporting
│   │   ├── admin/           # Admin Panel
│   │   └── layout.tsx       # Root Layout
│   ├── components/
│   │   ├── layout/          # Layout Components
│   │   ├── dashboard/       # Dashboard Components
│   │   ├── charts/          # Chart Components
│   │   ├── forms/           # Form Components
│   │   ├── tables/          # Table Components
│   │   └── ui/              # Shadcn UI Components
│   ├── lib/
│   │   ├── api.ts           # API Client
│   │   ├── auth.ts          # Auth Utils
│   │   ├── hooks/           # Custom Hooks
│   │   └── utils.ts         # Utilities
│   ├── styles/              # Global Styles
│   └── public/              # Static Assets
│
├── backend/                  # Laravel/NestJS API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── Services/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   ├── .env.example
│   └── composer.json
│
├── docker-compose.yml       # Docker Configuration
├── .github/
│   └── workflows/           # CI/CD Workflows
├── docs/                    # Documentation
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & npm/yarn
- PHP 8.2+ (untuk Laravel backend)
- PostgreSQL 13+
- Docker (optional)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/elahadi1985/e-kinerja-terpadu.git
cd e-kinerja-terpadu
```

#### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Akses di: `http://localhost:3000`

#### 3. Setup Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```
Akses di: `http://localhost:8000`

#### 4. Setup Database
```bash
# Menggunakan Docker
docker-compose up -d

# Manual
psql -U postgres -c "CREATE DATABASE e_kinerja_terpadu;"
```

## 🎨 Desain & UI/UX

### Color Palette
- **Primary Navy**: #1E3A8A
- **Secondary Emerald**: #10B981
- **Accent Cyan**: #06B6D4
- **Background Light**: #FFFFFF / #0F172A (Dark)
- **Text**: #1F2937 / #F3F4F6 (Dark)

### Typography
- **Heading**: Poppins Bold
- **Body**: Inter Regular
- **Code**: Fira Code

### Components
- Glassmorphism Effect
- Soft Shadow (0 10px 15px rgba)
- Rounded Corner 16px
- Smooth Animations (200ms)
- Loading Skeleton

## 🔐 Keamanan

- ✅ HTTPS / SSL
- ✅ JWT Authentication
- ✅ OAuth2 Support
- ✅ Role-Based Access Control (RBAC)
- ✅ Audit Trail & Activity Logging
- ✅ Password Encryption (bcrypt)
- ✅ CSRF Protection
- ✅ Rate Limiting
- ✅ Input Validation & Sanitization
- ✅ Automated Backups

## 👥 User Roles

| Role | Akses |
|------|-------|
| **Super Admin** | Akses penuh semua modul |
| **Admin** | Manajemen master data & users |
| **Operator** | Input & manajemen data |
| **Verifikator** | Verifikasi data |
| **Pimpinan** | View & approval |
| **Auditor** | Audit & monitoring |
| **Viewer** | Read-only access |

## 📊 Database Schema

### Core Tables
- `users` - User management
- `roles` - Role definitions
- `permissions` - Permission management
- `unit_kerja` - Organizational units
- `pegawai` - Employee data
- `renstra` - Strategic planning
- `iku` - Key performance indicators
- `sakip` - Performance accountability
- `spip_maturity` - SPIP ratings
- `zona_integritas` - Integrity zones
- `rb` - Business roadmap
- `pk` - Performance agreements
- `lkjip` - Performance reports
- `dokumen` - Document storage
- `monitoring` - Progress monitoring
- `evaluasi` - Evaluation data
- `audit_log` - Audit trail

## 📈 Monitoring & Analytics

- Real-time KPI tracking
- Trend analysis & forecasting
- Performance comparison
- Benchmarking
- Custom report generation
- Data export capabilities

## 🤖 AI Features

- **AI Summary** - Ringkasan otomatis
- **AI Recommendations** - Rekomendasi berbasis AI
- **AI Document Analysis** - Analisis dokumen otomatis
- **AI Gap Analysis** - Analisis kesenjangan
- **AI Performance Insight** - Insight kinerja
- **AI Prediction** - Prediksi performa
- **AI Report Generator** - Generate laporan otomatis
- **AI Chat Assistant** - Chatbot helper

## 🧪 Testing

```bash
# Frontend Testing
npm run test
npm run test:coverage

# Backend Testing
php artisan test
php artisan test --coverage
```

## 📝 Dokumentasi

- [Installation Guide](./docs/INSTALLATION.md)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💼 Author

**Elahadi** (elahadi1985)

## 📧 Support & Contact

- 📧 Email: support@e-kinerja-terpadu.id
- 🐛 Issues: [GitHub Issues](https://github.com/elahadi1985/e-kinerja-terpadu/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/elahadi1985/e-kinerja-terpadu/discussions)

---

**Made with ❤️ for Better Government Performance Management**
