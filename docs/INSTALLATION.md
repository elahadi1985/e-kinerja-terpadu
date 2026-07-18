# 📦 Installation Guide

## Prerequisites

- Node.js 18+ & npm/yarn/pnpm
- PHP 8.2+
- PostgreSQL 13+
- Composer
- Docker & Docker Compose (optional)

## Installation Methods

### Method 1: Using Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/elahadi1985/e-kinerja-terpadu.git
cd e-kinerja-terpadu

# Start all services
docker-compose up -d

# Wait for services to be ready
sleep 30

# Run migrations
docker-compose exec backend php artisan migrate:fresh --seed

# Access applications
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# MinIO Console: http://localhost:9001 (minioadmin/minioadmin123)
```

### Method 2: Manual Installation

#### 1. Clone Repository

```bash
git clone https://github.com/elahadi1985/e-kinerja-terpadu.git
cd e-kinerja-terpadu
```

#### 2. Setup Database

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE e_kinerja_terpadu;
CREATE USER e_kinerja WITH PASSWORD 'secure_password_123';
ALTER ROLE e_kinerja SET client_encoding TO 'utf8';
ALTER ROLE e_kinerja SET default_transaction_isolation TO 'read committed';
ALTER ROLE e_kinerja SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE e_kinerja_terpadu TO e_kinerja;
\q
```

#### 3. Backend Setup

```bash
cd backend
composer install
cp .env.example .env

# Update .env with database credentials
PHP_EDITOR=nano php artisan tinker
# atau edit manual

php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

#### 4. Frontend Setup

```bash
cd ../frontend
npm install
# or
yarn install
# or
pnpm install

npm run dev
```

Access at: `http://localhost:3000`

## Default Credentials

### Application

```
Email: admin@e-kinerja.test
Password: password123
```

### MinIO Console

```
Access Key: minioadmin
Secret Key: minioadmin123
URL: http://localhost:9001
```

## Environment Variables

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=e-Kinerja Terpadu
NEXT_PUBLIC_APP_DESCRIPTION=Sistem Manajemen Kinerja Pemerintah Terpadu
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env)

```bash
APP_NAME="e-Kinerja Terpadu"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=e_kinerja_terpadu
DB_USERNAME=e_kinerja
DB_PASSWORD=secure_password_123

CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin123
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=e-kinerja
AWS_URL=http://localhost:9000
AWS_ENDPOINT=http://localhost:9000
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000
lsof -i :8000
lsof -i :5432

# Kill process
kill -9 <PID>
```

### Database Connection Error

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# or with Docker
docker-compose logs postgres
```

### Dependencies Installation Issue

```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
rm -rf vendor composer.lock
composer install
```

## Verification

```bash
# Check frontend
curl http://localhost:3000

# Check backend
curl http://localhost:8000/api/health

# Check database
psql -U e_kinerja -d e_kinerja_terpadu -c "SELECT 1;"
```

## Next Steps

- Read [Architecture Guide](./ARCHITECTURE.md)
- Read [API Documentation](./API.md)
- Read [Database Schema](./DATABASE.md)
- Check [Development Guide](./DEVELOPMENT.md)
