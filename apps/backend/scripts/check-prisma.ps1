# Check if Prisma is set up
$prismaDir = "prisma"
$schemaFile = "schema.prisma"
$migrationsDir = "migrations"

# Check if prisma directory and schema exist
if (-not (Test-Path "$prismaDir/$schemaFile")) {
    Write-Host "🔧 Prisma not initialized. Running setup..." -ForegroundColor Yellow
    npx prisma init --datasource-provider sqlite
}

# Check if migrations exist
if (-not (Test-Path "$prismaDir/$migrationsDir")) {
    Write-Host "🔄 No migrations found. Running initial migration..." -ForegroundColor Yellow
    npx prisma migrate dev --name init
}

# Always generate Prisma client to ensure it's up to date
Write-Host "⚡ Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate 