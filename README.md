# 🏛️ e-Kinerja Terpadu

**Sistem Pengumpulan, Pengelolaan, Monitoring, Evaluasi, dan Pelaporan Data Manajemen Kinerja Pemerintah Terpadu**

[![GitHub License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com)

## 📋 Tentang Aplikasi

e-Kinerja Terpadu adalah sistem informasi manajemen kinerja pemerintah yang mengintegrasikan SAKIP, RENSTRA, IKU, SPIP, Zona Integritas, RB, PK, LKjIP, dan Manajemen Kinerja Organisasi dengan tampilan premium seperti Microsoft Power BI, Google Analytics, dan Notion.

## 🎯 Fitur Utama

- 📊 Dashboard interaktif dengan multiple chart types
- 🎨 Glassmorphism design dengan dark/light mode
- 📱 Fully responsive (Desktop, Tablet, Mobile)
- 🔐 Enterprise-grade security (JWT, RBAC, Audit Trail)
- 🤖 AI-powered insights & recommendations
- 📄 Export ke PDF, Excel, Word, CSV
- 🔄 Workflow approval & revision management

## 🏗️ Teknologi

- **Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **Backend**: Laravel 12 REST API
- **Database**: PostgreSQL
- **Storage**: MinIO / AWS S3

## 📁 Struktur Project

```
e-kinerja-terpadu/
├── frontend/          # Next.js Application
├── backend/           # Laravel API
├── docs/              # Documentation
└── docker-compose.yml # Docker Configuration
```

## 🚀 Quick Start

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

## 🔐 Keamanan

- ✅ HTTPS/SSL
- ✅ JWT Authentication
- ✅ RBAC (Role-Based Access Control)
- ✅ Audit Trail & Activity Logging
- ✅ Password Encryption
- ✅ CSRF Protection
- ✅ Rate Limiting

## 📄 License

MIT License - see LICENSE file for details

---

**Made with ❤️ for Better Government Performance Management**
