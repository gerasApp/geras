# Setup script for new instances
Write-Host "🚀 Starting project setup..." -ForegroundColor Green

# Navigate to backend directory
Set-Location -Path "apps/backend"

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
pnpm install

# Initialize Prisma with SQLite
Write-Host "🔧 Setting up Prisma with SQLite..." -ForegroundColor Yellow
npx prisma init --datasource-provider sqlite

# Generate Prisma client
Write-Host "⚡ Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Run initial migration
Write-Host "🔄 Running initial migration..." -ForegroundColor Yellow
npx prisma migrate dev --name init

Write-Host "✅ Setup completed successfully!" -ForegroundColor Green
Write-Host "You can now start the development server with 'pnpm dev'" -ForegroundColor Cyan 