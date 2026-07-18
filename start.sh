#!/bin/bash

set -e

echo "🚀 Starting e-Kinerja Terpadu Application..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Step 1: Setting up Backend (Laravel)${NC}"
cd backend

echo "📦 Installing PHP dependencies..."
composer install --no-dev -q

echo "🔑 Generating application key..."
php artisan key:generate --force

echo "🗄️  Creating database and running migrations..."
php artisan migrate:fresh --seed --force -q

echo "📁 Publishing storage files..."
php artisan storage:link --force

echo -e "${GREEN}✓ Backend setup completed!${NC}"
echo ""

echo -e "${BLUE}Step 2: Starting Backend Server${NC}"
echo "🌐 Backend running at http://localhost:8000"
php artisan serve --host=0.0.0.0 --port=8000 &
BACKEND_PID=$!

echo ""
echo -e "${BLUE}Step 3: Setting up Frontend (Next.js)${NC}"
cd ../frontend

echo "📦 Installing Node dependencies..."
npm install -q

echo "🔨 Building application..."
npm run build

echo -e "${GREEN}✓ Frontend setup completed!${NC}"
echo ""

echo -e "${BLUE}Step 4: Starting Frontend Server${NC}"
echo "🌐 Frontend running at http://localhost:3000"
npm run start &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✅ Application Started Successfully!${NC}"
echo ""
echo -e "${YELLOW}Access Information:${NC}"
echo -e "  Frontend:  ${BLUE}http://localhost:3000${NC}"
echo -e "  Backend:   ${BLUE}http://localhost:8000${NC}"
echo -e "  API Docs:  ${BLUE}http://localhost:8000/api/health${NC}"
echo ""
echo -e "${YELLOW}Default Login Credentials:${NC}"
echo -e "  Email:    ${BLUE}admin@e-kinerja.test${NC}"
echo -e "  Password: ${BLUE}password123${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the application${NC}"
echo ""

wait
