@echo off
chcp 65001 >nul
title Brainity Course Web - Docker Startup Script

echo 🚀 Khởi chạy Brainity Course Web với Docker...

REM Kiểm tra Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker không được cài đặt. Vui lòng cài đặt Docker Desktop trước.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose không được cài đặt. Vui lòng cài đặt Docker Desktop trước.
    pause
    exit /b 1
)

REM Kiểm tra file .env
if not exist .env (
    echo ⚠️  File .env không tồn tại. Tạo file .env từ template...
    echo Vui lòng cập nhật các environment variables trong file .env
    echo Sau đó chạy lại script này.
    pause
    exit /b 1
)

:menu
cls
echo.
echo 📋 Chọn chế độ chạy:
echo 1) Production Mode (Client + Server + MongoDB)
echo 2) Development Mode (với hot reload)
echo 3) Production với Nginx Reverse Proxy
echo 4) Chỉ MongoDB
echo 5) Chỉ Server
echo 6) Chỉ Client
echo 7) Dừng tất cả services
echo 8) Xem logs
echo 9) Rebuild images
echo 0) Thoát
echo.
set /p choice="Nhập lựa chọn (0-9): "

if "%choice%"=="1" goto production
if "%choice%"=="2" goto development
if "%choice%"=="3" goto production_nginx
if "%choice%"=="4" goto mongodb_only
if "%choice%"=="5" goto server_only
if "%choice%"=="6" goto client_only
if "%choice%"=="7" goto stop_services
if "%choice%"=="8" goto show_logs
if "%choice%"=="9" goto rebuild_images
if "%choice%"=="0" goto exit
echo ❌ Lựa chọn không hợp lệ. Vui lòng thử lại.
pause
goto menu

:production
echo 🏭 Khởi chạy Production Mode...
docker-compose up -d
echo ✅ Production Mode đã khởi chạy!
echo 🌐 Client: http://localhost:3000
echo 🔧 Server: http://localhost:8000
echo 🗄️  MongoDB: localhost:27017
pause
goto menu

:development
echo 🔧 Khởi chạy Development Mode...
docker-compose --profile development up -d
echo ✅ Development Mode đã khởi chạy!
echo 🌐 Client: http://localhost:3000 (với hot reload)
echo 🔧 Server: http://localhost:8000 (với nodemon)
echo 🗄️  MongoDB: localhost:27017
pause
goto menu

:production_nginx
echo 🚀 Khởi chạy Production Mode với Nginx...
docker-compose --profile production up -d
echo ✅ Production Mode với Nginx đã khởi chạy!
echo 🌐 Main URL: http://localhost
echo 🔧 API: http://localhost/api
pause
goto menu

:mongodb_only
echo 🗄️  Khởi chạy chỉ MongoDB...
docker-compose up mongodb -d
echo ✅ MongoDB đã khởi chạy!
echo 🗄️  MongoDB: localhost:27017
pause
goto menu

:server_only
echo 🔧 Khởi chạy chỉ Server...
docker-compose up mongodb server -d
echo ✅ Server và MongoDB đã khởi chạy!
echo 🔧 Server: http://localhost:8000
pause
goto menu

:client_only
echo 🌐 Khởi chạy chỉ Client...
docker-compose up mongodb client -d
echo ✅ Client và MongoDB đã khởi chạy!
echo 🌐 Client: http://localhost:3000
pause
goto menu

:stop_services
echo 🛑 Dừng tất cả services...
docker-compose down
echo ✅ Tất cả services đã được dừng!
pause
goto menu

:show_logs
echo 📋 Chọn service để xem logs:
echo 1) Tất cả services
echo 2) Client
echo 3) Server
echo 4) MongoDB
echo 5) Nginx
set /p log_choice="Nhập lựa chọn (1-5): "

if "%log_choice%"=="1" docker-compose logs -f
if "%log_choice%"=="2" docker-compose logs -f client
if "%log_choice%"=="3" docker-compose logs -f server
if "%log_choice%"=="4" docker-compose logs -f mongodb
if "%log_choice%"=="5" docker-compose logs -f nginx
pause
goto menu

:rebuild_images
echo 🔨 Rebuild tất cả images...
docker-compose build --no-cache
echo ✅ Images đã được rebuild!
pause
goto menu

:exit
echo 👋 Tạm biệt!
exit /b 0 