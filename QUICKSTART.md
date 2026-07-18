# e-Kinerja Terpadu - Quick Start Guide

## Prerequisites

- Docker & Docker Compose
- OR: Node.js 18+, PHP 8.2+, PostgreSQL 13+

## Option 1: Using Docker (Recommended)

### Start Services

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Access Applications

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **MinIO Console**: http://localhost:9001 (minioadmin/minioadmin123)
- **PostgreSQL**: localhost:5432

## Option 2: Manual Setup

### Backend Setup

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate:fresh --seed

# Start Laravel server
php artisan serve
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# OR Production build
npm run build
npm run start
```

## Default Credentials

```
Email: admin@e-kinerja.test
Password: password123
```

## API Documentation

### Authentication

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@e-kinerja.test","password":"password123"}'

# Response
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {...}
  }
}
```

### Using Token

```bash
curl -X GET http://localhost:8000/api/dashboard/overview \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Project Structure

```
e-kinerja-terpadu/
├── frontend/                 # Next.js Application
│   ├── app/                 # Routes & Pages
│   ├── components/          # React Components
│   ├── lib/                 # Utilities & Hooks
│   └── styles/              # Global Styles
├── backend/                  # Laravel API
│   ├── app/                 # Application Code
│   ├── database/            # Migrations & Seeds
│   ├── routes/              # API Routes
│   └── config/              # Configuration
├── docs/                    # Documentation
└── docker-compose.dev.yml   # Docker Configuration
```

## Available Scripts

### Frontend

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
npm run test         # Run tests
```

### Backend

```bash
php artisan serve                    # Start server
php artisan migrate                  # Run migrations
php artisan migrate:fresh --seed     # Reset database
php artisan tinker                   # Interactive shell
php artisan test                     # Run tests
```

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process
lsof -i :3000
lsof -i :8000
kill -9 <PID>
```

### Database Connection Error

```bash
# Check PostgreSQL
psql -U e_kinerja -d e_kinerja_terpadu

# OR with Docker
docker-compose -f docker-compose.dev.yml logs postgres
```

### Clear Cache

```bash
# Backend
php artisan cache:clear
php artisan config:clear

# Frontend
rm -rf .next
npm run build
```

## Environment Variables

See `.env.example` files in frontend and backend directories.

## Support

For issues or questions:
- Check documentation in `/docs`
- Review GitHub issues
- Check logs: `docker-compose -f docker-compose.dev.yml logs`

## License

MIT License
