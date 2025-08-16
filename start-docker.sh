#!/bin/bash

# Brainity Course Web - Docker Startup Script

echo "🚀 Khởi chạy Brainity Course Web với Docker..."

# Kiểm tra Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker không được cài đặt. Vui lòng cài đặt Docker trước."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose không được cài đặt. Vui lòng cài đặt Docker Compose trước."
    exit 1
fi

# Kiểm tra file .env
if [ ! -f .env ]; then
    echo "⚠️  File .env không tồn tại. Tạo file .env từ template..."
    echo "Vui lòng cập nhật các environment variables trong file .env"
    echo "Sau đó chạy lại script này."
    exit 1
fi

# Function để hiển thị menu
show_menu() {
    echo ""
    echo "📋 Chọn chế độ chạy:"
    echo "1) Production Mode (Client + Server + MongoDB)"
    echo "2) Development Mode (với hot reload)"
    echo "3) Production với Nginx Reverse Proxy"
    echo "4) Chỉ MongoDB"
    echo "5) Chỉ Server"
    echo "6) Chỉ Client"
    echo "7) Dừng tất cả services"
    echo "8) Xem logs"
    echo "9) Rebuild images"
    echo "0) Thoát"
    echo ""
    read -p "Nhập lựa chọn (0-9): " choice
}

# Function để chạy production mode
run_production() {
    echo "🏭 Khởi chạy Production Mode..."
    docker-compose up -d
    echo "✅ Production Mode đã khởi chạy!"
    echo "🌐 Client: http://localhost:3000"
    echo "🔧 Server: http://localhost:8000"
    echo "🗄️  MongoDB: localhost:27017"
}

# Function để chạy development mode
run_development() {
    echo "🔧 Khởi chạy Development Mode..."
    docker-compose --profile development up -d
    echo "✅ Development Mode đã khởi chạy!"
    echo "🌐 Client: http://localhost:3000 (với hot reload)"
    echo "🔧 Server: http://localhost:8000 (với nodemon)"
    echo "🗄️  MongoDB: localhost:27017"
}

# Function để chạy production với nginx
run_production_nginx() {
    echo "🚀 Khởi chạy Production Mode với Nginx..."
    docker-compose --profile production up -d
    echo "✅ Production Mode với Nginx đã khởi chạy!"
    echo "🌐 Main URL: http://localhost"
    echo "🔧 API: http://localhost/api"
}

# Function để chạy chỉ MongoDB
run_mongodb_only() {
    echo "🗄️  Khởi chạy chỉ MongoDB..."
    docker-compose up mongodb -d
    echo "✅ MongoDB đã khởi chạy!"
    echo "🗄️  MongoDB: localhost:27017"
}

# Function để chạy chỉ Server
run_server_only() {
    echo "🔧 Khởi chạy chỉ Server..."
    docker-compose up mongodb server -d
    echo "✅ Server và MongoDB đã khởi chạy!"
    echo "🔧 Server: http://localhost:8000"
}

# Function để chạy chỉ Client
run_client_only() {
    echo "🌐 Khởi chạy chỉ Client..."
    docker-compose up mongodb client -d
    echo "✅ Client và MongoDB đã khởi chạy!"
    echo "🌐 Client: http://localhost:3000"
}

# Function để dừng services
stop_services() {
    echo "🛑 Dừng tất cả services..."
    docker-compose down
    echo "✅ Tất cả services đã được dừng!"
}

# Function để xem logs
show_logs() {
    echo "📋 Chọn service để xem logs:"
    echo "1) Tất cả services"
    echo "2) Client"
    echo "3) Server"
    echo "4) MongoDB"
    echo "5) Nginx"
    read -p "Nhập lựa chọn (1-5): " log_choice
    
    case $log_choice in
        1) docker-compose logs -f ;;
        2) docker-compose logs -f client ;;
        3) docker-compose logs -f server ;;
        4) docker-compose logs -f mongodb ;;
        5) docker-compose logs -f nginx ;;
        *) echo "Lựa chọn không hợp lệ" ;;
    esac
}

# Function để rebuild images
rebuild_images() {
    echo "🔨 Rebuild tất cả images..."
    docker-compose build --no-cache
    echo "✅ Images đã được rebuild!"
}

# Main loop
while true; do
    show_menu
    
    case $choice in
        1) run_production ;;
        2) run_development ;;
        3) run_production_nginx ;;
        4) run_mongodb_only ;;
        5) run_server_only ;;
        6) run_client_only ;;
        7) stop_services ;;
        8) show_logs ;;
        9) rebuild_images ;;
        0) 
            echo "👋 Tạm biệt!"
            exit 0
            ;;
        *) 
            echo "❌ Lựa chọn không hợp lệ. Vui lòng thử lại."
            ;;
    esac
    
    if [ "$choice" != "8" ] && [ "$choice" != "0" ]; then
        echo ""
        read -p "Nhấn Enter để tiếp tục..."
    fi
done 