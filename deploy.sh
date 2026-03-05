#!/bin/bash

# ============================================
# Vine Dental Clinic - Deployment Script
# ============================================

set -e

echo "🦷 Starting Vine Dental Clinic deployment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Type check
echo -e "${YELLOW}🔍 Running type check...${NC}"
npm run type-check

# Lint
echo -e "${YELLOW}🔍 Running lint...${NC}"
npm run lint

# Build
echo -e "${YELLOW}🔨 Building for production...${NC}"
npm run build

# Check if build succeeded
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
    echo -e "${GREEN}📦 dist/ folder created with $(du -sh dist | cut -f1)${NC}"
else
    echo -e "${RED}❌ Build failed. dist/ folder not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment ready!${NC}"
echo ""
echo "📋 Next steps:"
echo "   1. Set environment variables in Vercel"
echo "   2. Push to GitHub"
echo "   3. Or deploy manually: vercel --prod"