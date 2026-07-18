# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                          │
│                   (Next.js + React 19)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │    Master    │  │   Modules    │      │
│  │   Analytics  │  │     Data     │  │  SAKIP, IKU  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────┬────────────────────────────────────────┘
                     │ API Calls (JSON over HTTPS)
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                       API Layer                              │
│                  (Laravel REST API)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers → Services → Repositories → Models      │  │
│  └────────────────────���─────────────────────────────────┘  │
└────┬──────────────────────┬──────────────────────┬──────────┘
     │                      │                      │
     ↓                      ↓                      ↓
┌─────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ PostgreSQL  │  │ Redis Cache      │  │ MinIO S3 Storage │
│ Database    │  │ (Session/Cache)  │  │ (Documents)      │
└─────────────┘  └──────────────────┘  └──────────────────┘
```

## Project Structure

### Frontend Structure

```
frontend/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (dashboard)/               # Dashboard layout
│   │   ├── dashboard/             # Main dashboard
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (app)/                      # Main application layout
│   │   ├── master/                # Master data management
│   │   │   ├── unit-kerja/
│   │   │   ├── pegawai/
│   │   │   ├── jabatan/
│   │   │   └── ...
│   │   ├── renstra/               # Strategic planning
│   │   ├── sakip/                 # Performance accountability
│   │   ├── iku/                   # Key performance indicators
│   │   ├── spip/                  # Maturity rating
│   │   ├── zona-integritas/       # Integrity zones
│   │   ├── rb/                    # Business roadmap
│   │   ├── pk/                    # Performance agreement
│   │   ├── lkjip/                 # Performance report
│   │   ├── dokumen/               # Document management
│   │   ├── monitoring/            # Monitoring & evaluation
│   │   ├── laporan/               # Reporting
│   │   ├── admin/                 # Admin panel
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── layout/                    # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── dashboard/                 # Dashboard components
│   │   ├── TopCards.tsx
│   │   ├── Charts/
│   │   ├── Widgets/
│   │   └── ...
│   ├── charts/                    # Chart components
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── RadarChart.tsx
│   │   ├── GaugeChart.tsx
│   │   ├── HeatmapChart.tsx
│   │   └── AreaChart.tsx
│   ├── forms/                     # Form components
│   │   ├── FormField.tsx
│   │   ├── FormWrapper.tsx
│   │   ├── ValidationError.tsx
│   │   └── ...
│   ├── tables/                    # Table components
│   │   ├── DataTable.tsx
│   │   ├── Pagination.tsx
│   │   └── ...
│   ├── ui/                        # Shadcn UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Dialog.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Select.tsx
│   │   └── ...
│   ├── common/                    # Common components
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ...
│   └── modals/                    # Modal dialogs
├── lib/
│   ├── api.ts                     # API client
│   ├── auth.ts                    # Auth utilities
│   ├── api/
│   │   ├── endpoints.ts           # API endpoints
│   │   ├── auth.ts
│   │   ├── master.ts
│   │   ├── sakip.ts
│   │   ├── iku.ts
│   │   └── ...
│   ├── hooks/                     # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   ├── useForm.ts
│   │   ├── useModal.ts
│   │   └── ...
│   ├── utils/
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   ├── date.ts
│   │   ├── file.ts
│   │   └── ...
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── routes.ts
│   │   ├── api.ts
│   │   └── ...
│   └── types/                     # TypeScript types
│       ├── api.ts
│       ├── models.ts
│       ├── forms.ts
│       └── ...
├── styles/
│   ├── globals.css                # Global styles
│   ├── animations.css             # Animation styles
│   ├── themes.css                 # Theme styles
│   └── ...
├── public/                        # Static assets
│   ├── logo.svg
│   ├── favicon.ico
│   ├── images/
│   └── icons/
├── .env.example
├── .env.local
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

### Backend Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/           # API Controllers
│   │   │   ├── AuthController.php
│   │   │   ├── DashboardController.php
│   │   │   ├── MasterController.php
│   │   │   ├── SakipController.php
│   │   │   ├── IkuController.php
│   │   │   ├── RenstraController.php
│   │   │   ├── SpipController.php
│   │   │   ├── ZonaIntegritasController.php
│   │   │   ├── RbController.php
│   │   │   ├── PkController.php
│   │   │   ├── LkjipController.php
│   │   │   ├── DokumenController.php
│   │   │   ├── MonitoringController.php
│   │   │   ├── LaporanController.php
│   │   │   └── AdminController.php
│   │   ├── Middleware/            # Middleware
│   │   │   ├── Authenticate.php
│   │   │   ├── CheckRole.php
│   │   │   ├── RateLimiter.php
│   │   │   └── ...
│   │   ├── Requests/              # Form Requests
│   │   │   ├── LoginRequest.php
│   │   │   ├── StoreUserRequest.php
│   │   │   └── ...
│   │   └── Resources/             # API Resources
│   │       ├── UserResource.php
│   │       ├── DashboardResource.php
│   │       └── ...
│   ├── Models/                    # Eloquent Models
│   │   ├── User.php
│   │   ├── Role.php
│   │   ├── Permission.php
│   │   ├── UnitKerja.php
│   │   ├── Pegawai.php
│   │   ├── Renstra.php
│   │   ├── IKU.php
│   │   ├── SAKIP.php
│   │   ├── SPIP.php
│   │   ├── ZonaIntegritas.php
│   │   ├── RB.php
│   │   ├── PK.php
│   │   ├── LKjIP.php
│   │   ├── Dokumen.php
│   │   ├── Monitoring.php
│   │   ├── Evaluasi.php
│   │   ├── AuditLog.php
│   │   └── ...
│   ├── Services/                  # Business Logic
│   │   ├── AuthService.php
│   │   ├── DashboardService.php
│   │   ├── SakipService.php
│   │   ├── IkuService.php
│   │   ├── RenstraService.php
│   │   ├── ReportService.php
│   │   ├── NotificationService.php
│   │   ├── DocumentService.php
│   │   └── ...
│   ├── Repositories/              # Data Access Layer
│   │   ├── UserRepository.php
│   │   ├── SakipRepository.php
│   │   ├── IkuRepository.php
│   │   └── ...
│   ├── Events/                    # Events
│   │   ├── UserCreated.php
│   │   ├── DocumentUploaded.php
│   │   └── ...
│   ├── Listeners/                 # Event Listeners
│   │   ├── SendWelcomeEmail.php
│   │   └── ...
│   ├── Traits/                    # Reusable Traits
│   │   ├── HasAuditLog.php
│   │   ├── HasWorkflow.php
│   │   └���─ ...
│   └── Exceptions/                # Custom Exceptions
│       ├── UnauthorizedException.php
│       └── ...
├── database/
│   ├── migrations/                # Database Migrations
│   │   ├── 2026_01_01_000001_create_users_table.php
│   │   ├── 2026_01_01_000002_create_roles_table.php
│   │   ├── 2026_01_01_000003_create_unit_kerja_table.php
│   │   └── ...
│   ├── seeders/                   # Database Seeders
│   │   ├── DatabaseSeeder.php
│   │   ├── UserSeeder.php
│   │   ├── RoleSeeder.php
│   │   ├── UnitKerjaSeeder.php
│   │   └── ...
│   └── factories/                 # Model Factories
│       ├── UserFactory.php
│       ├── SakipFactory.php
│       └── ...
├── routes/
│   ├── api.php                    # API routes
│   ├── web.php                    # Web routes
│   └── console.php                # Console routes
├── config/
│   ├── app.php
│   ├── database.php
│   ├── filesystems.php
│   ├── cache.php
│   ├── queue.php
│   ├── mail.php
│   └── ...
├── storage/
│   ├── app/
│   ├── logs/
│   └── framework/
├── tests/
│   ├── Feature/                   # Feature tests
│   ├── Unit/                      # Unit tests
│   └── TestCase.php
├── .env.example
├── artisan
├── bootstrap/
├── composer.json
├── phpunit.xml
└── README.md
```

## Data Flow

### Authentication Flow

```
User Login
    ↓
Frontend Form
    ↓
Validation (Client-side)
    ↓
API Request (POST /api/auth/login)
    ↓
Backend Validation
    ↓
Credential Verification
    ↓
JWT Token Generation
    ↓
Return Token + User Data
    ↓
Store Token (localStorage/httpOnly Cookie)
    ↓
Redirect to Dashboard
```

### Data Creation Flow

```
User Input Form
    ↓
Client-side Validation (Zod)
    ↓
API Request (POST /api/resource)
    ↓
Backend Validation (Form Request)
    ↓
Business Logic (Service)
    ↓
Database Save (Model)
    ↓
Audit Log Entry
    ↓
Notification/Event Trigger
    ↓
Return Response
    ↓
UI Update
```

## Technology Stack Details

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4
- **Components**: Shadcn UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios/Fetch API
- **State Management**: React Context / Zustand
- **Icons**: Heroicons / Lucide React

### Backend
- **Framework**: Laravel 12
- **Language**: PHP 8.2+
- **API**: REST API with JSON
- **Authentication**: JWT + OAuth2
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **File Storage**: MinIO / AWS S3
- **Queue**: Laravel Queue (Redis)
- **Testing**: PHPUnit

## Security Architecture

```
HTTPS/TLS
    ↓
CRSF Protection
    ↓
JWT Authentication
    ↓
Role-Based Access Control (RBAC)
    ↓
Input Validation & Sanitization
    ↓
Password Encryption (bcrypt)
    ↓
Audit Logging
    ↓
Rate Limiting
    ↓
Encrypted Sensitive Data
```

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│            Load Balancer / CDN              │
└────────────────┬────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    ↓            ↓            ↓
┌────────┐  ┌────────┐  ┌────────┐
│Frontend│  │Frontend│  │Frontend│
│Node 1  │  │Node 2  │  │Node 3  │
└────────┘  └────────┘  └────────┘
    │            │            │
    └────────────┼────────────┘
                 ↓
        ┌──────────────────┐
        │  API Gateway     │
        └────────┬─────────┘
                 │
    ┌────────────┼────────────┐
    ↓            ↓            ↓
┌────────┐  ┌────────┐  ┌────────┐
│Backend │  │Backend │  │Backend │
│Node 1  │  │Node 2  │  │Node 3  │
└────────┘  └────────┘  └────────┘
    │            │            │
    └────────────┼────────────┘
                 ↓
        ┌──────────────────┐
        │ PostgreSQL DB    │
        │ (Primary+Replicas)│
        └──────────────────┘

        ┌──────────────────┐
        │ Redis Cluster    │
        └──────────────────┘

        ┌──────────────────┐
        │ MinIO S3 Storage │
        └──────────────────┘
```
