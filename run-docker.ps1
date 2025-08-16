# Brainity Course Web - Docker PowerShell Script

Write-Host "🚀 Khởi chạy Brainity Course Web với Docker..." -ForegroundColor Green

# Kiểm tra Docker
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker không được cài đặt hoặc chưa khởi động" -ForegroundColor Red
    Write-Host "Vui lòng khởi động Docker Desktop và thử lại" -ForegroundColor Yellow
    exit 1
}

# Kiểm tra Docker Compose
try {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose không được cài đặt" -ForegroundColor Red
    exit 1
}

# Kiểm tra file .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  File .env không tồn tại" -ForegroundColor Yellow
    Write-Host "Tạo file .env từ env-template.txt..." -ForegroundColor Yellow
    
    if (Test-Path "env-template.txt") {
        Copy-Item "env-template.txt" ".env"
        Write-Host "✅ File .env đã được tạo từ template" -ForegroundColor Green
        Write-Host "Vui lòng cập nhật các environment variables trong file .env" -ForegroundColor Yellow
        Write-Host "Sau đó chạy lại script này" -ForegroundColor Yellow
        exit 1
    } else {
        Write-Host "❌ Không tìm thấy env-template.txt" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ File .env đã tồn tại" -ForegroundColor Green

# Kiểm tra trạng thái Docker
try {
    $dockerInfo = docker info 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Docker Desktop chưa khởi động hoàn toàn" -ForegroundColor Yellow
        Write-Host "Đang chờ Docker Desktop khởi động..." -ForegroundColor Yellow
        
        # Chờ Docker khởi động
        $maxAttempts = 30
        $attempt = 0
        do {
            Start-Sleep -Seconds 2
            $attempt++
            try {
                $null = docker ps 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✅ Docker Desktop đã sẵn sàng" -ForegroundColor Green
                    break
                }
            } catch {
                # Continue waiting
            }
        } while ($attempt -lt $maxAttempts)
        
        if ($attempt -ge $maxAttempts) {
            Write-Host "❌ Docker Desktop không khởi động được sau 60 giây" -ForegroundColor Red
            Write-Host "Vui lòng kiểm tra Docker Desktop và thử lại" -ForegroundColor Yellow
            exit 1
        }
    }
} catch {
    Write-Host "❌ Không thể kết nối với Docker" -ForegroundColor Red
    exit 1
}

# Hiển thị menu
function Show-Menu {
    Clear-Host
    Write-Host "📋 Chọn chế độ chạy:" -ForegroundColor Cyan
    Write-Host "1) Production Mode (Client + Server + MongoDB)" -ForegroundColor White
    Write-Host "2) Development Mode (với hot reload)" -ForegroundColor White
    Write-Host "3) Production với Nginx Reverse Proxy" -ForegroundColor White
    Write-Host "4) Chỉ MongoDB" -ForegroundColor White
    Write-Host "5) Chỉ Server" -ForegroundColor White
    Write-Host "6) Chỉ Client" -ForegroundColor White
    Write-Host "7) Dừng tất cả services" -ForegroundColor White
    Write-Host "8) Xem logs" -ForegroundColor White
    Write-Host "9) Rebuild images" -ForegroundColor White
    Write-Host "0) Thoát" -ForegroundColor White
    Write-Host ""
}

# Function để chạy production mode
function Start-Production {
    Write-Host "🏭 Khởi chạy Production Mode..." -ForegroundColor Yellow
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Production Mode đã khởi chạy!" -ForegroundColor Green
        Write-Host "🌐 Client: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "🔧 Server: http://localhost:8000" -ForegroundColor Cyan
        Write-Host "🗄️  MongoDB: localhost:27017" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Có lỗi xảy ra khi khởi chạy Production Mode" -ForegroundColor Red
    }
}

# Function để chạy development mode
function Start-Development {
    Write-Host "🔧 Khởi chạy Development Mode..." -ForegroundColor Yellow
    docker-compose --profile development up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Development Mode đã khởi chạy!" -ForegroundColor Green
        Write-Host "🌐 Client: http://localhost:3000 (với hot reload)" -ForegroundColor Cyan
        Write-Host "🔧 Server: http://localhost:8000 (với nodemon)" -ForegroundColor Cyan
        Write-Host "🗄️  MongoDB: localhost:27017" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Có lỗi xảy ra khi khởi chạy Development Mode" -ForegroundColor Red
    }
}

# Function để chạy production với nginx
function Start-ProductionNginx {
    Write-Host "🚀 Khởi chạy Production Mode với Nginx..." -ForegroundColor Yellow
    docker-compose --profile production up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Production Mode với Nginx đã khởi chạy!" -ForegroundColor Green
        Write-Host "🌐 Main URL: http://localhost" -ForegroundColor Cyan
        Write-Host "🔧 API: http://localhost/api" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Có lỗi xảy ra khi khởi chạy Production Mode với Nginx" -ForegroundColor Red
    }
}

# Function để dừng services
function Stop-Services {
    Write-Host "🛑 Dừng tất cả services..." -ForegroundColor Yellow
    docker-compose down
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Tất cả services đã được dừng!" -ForegroundColor Green
    } else {
        Write-Host "❌ Có lỗi xảy ra khi dừng services" -ForegroundColor Red
    }
}

# Function để xem logs
function Show-Logs {
    Write-Host "📋 Chọn service để xem logs:" -ForegroundColor Cyan
    Write-Host "1) Tất cả services" -ForegroundColor White
    Write-Host "2) Client" -ForegroundColor White
    Write-Host "3) Server" -ForegroundColor White
    Write-Host "4) MongoDB" -ForegroundColor White
    Write-Host "5) Nginx" -ForegroundColor White
    
    $logChoice = Read-Host "Nhập lựa chọn (1-5)"
    
    switch ($logChoice) {
        "1" { docker-compose logs -f }
        "2" { docker-compose logs -f client }
        "3" { docker-compose logs -f server }
        "4" { docker-compose logs -f mongodb }
        "5" { docker-compose logs -f nginx }
        default { Write-Host "❌ Lựa chọn không hợp lệ" -ForegroundColor Red }
    }
}

# Function để rebuild images
function Rebuild-Images {
    Write-Host "🔨 Rebuild tất cả images..." -ForegroundColor Yellow
    docker-compose build --no-cache
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Images đã được rebuild!" -ForegroundColor Green
    } else {
        Write-Host "❌ Có lỗi xảy ra khi rebuild images" -ForegroundColor Red
    }
}

# Main loop
do {
    Show-Menu
    $choice = Read-Host "Nhập lựa chọn (0-9)"
    
    switch ($choice) {
        "1" { Start-Production }
        "2" { Start-Development }
        "3" { Start-ProductionNginx }
        "4" { 
            Write-Host "🗄️  Khởi chạy chỉ MongoDB..." -ForegroundColor Yellow
            docker-compose up mongodb -d
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ MongoDB đã khởi chạy!" -ForegroundColor Green
                Write-Host "🗄️  MongoDB: localhost:27017" -ForegroundColor Cyan
            }
        }
        "5" { 
            Write-Host "🔧 Khởi chạy chỉ Server..." -ForegroundColor Yellow
            docker-compose up mongodb server -d
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Server và MongoDB đã khởi chạy!" -ForegroundColor Green
                Write-Host "🔧 Server: http://localhost:8000" -ForegroundColor Cyan
            }
        }
        "6" { 
            Write-Host "🌐 Khởi chạy chỉ Client..." -ForegroundColor Yellow
            docker-compose up mongodb client -d
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Client và MongoDB đã khởi chạy!" -ForegroundColor Green
                Write-Host "🌐 Client: http://localhost:3000" -ForegroundColor Cyan
            }
        }
        "7" { Stop-Services }
        "8" { Show-Logs }
        "9" { Rebuild-Images }
        "0" { 
            Write-Host "👋 Tạm biệt!" -ForegroundColor Green
            exit 0
        }
        default { 
            Write-Host "❌ Lựa chọn không hợp lệ. Vui lòng thử lại." -ForegroundColor Red
        }
    }
    
    if ($choice -ne "8" -and $choice -ne "0") {
        Write-Host ""
        Read-Host "Nhấn Enter để tiếp tục"
    }
} while ($true) 