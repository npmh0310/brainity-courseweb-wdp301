# 🚀 Hướng dẫn nhanh chạy Docker

## 📋 Bước 1: Chuẩn bị

1. **Khởi động Docker Desktop**

   - Mở Docker Desktop từ Start Menu
   - Đợi Docker khởi động hoàn toàn (icon Docker chuyển sang màu xanh)

2. **Tạo file .env**
   ```bash
   # Copy file env-template.txt thành .env
   copy env-template.txt .env
   ```

## 🎯 Bước 2: Chạy dự án

### Cách 1: Sử dụng PowerShell Script (Khuyến nghị)

```powershell
# Chạy script PowerShell
.\run-docker.ps1
```

### Cách 2: Sử dụng Command Line

```bash
# Production Mode
docker-compose up -d

# Development Mode
docker-compose --profile development up -d

# Production với Nginx
docker-compose --profile production up -d
```

## 🌐 Truy cập ứng dụng

- **Client (React)**: http://localhost:3000
- **Server (Node.js)**: http://localhost:8000
- **MongoDB**: localhost:27017
- **Nginx**: http://localhost:80 (production mode)

## 🛠️ Các lệnh hữu ích

```bash
# Xem trạng thái containers
docker-compose ps

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down

# Rebuild images
docker-compose build --no-cache
```

## ❗ Troubleshooting

### Docker Desktop chưa khởi động

- Kiểm tra Docker Desktop đã chạy chưa
- Đợi icon Docker chuyển sang màu xanh

### Port conflicts

- Kiểm tra ports 3000, 8000, 27017 có đang được sử dụng không
- Thay đổi ports trong docker-compose.yml nếu cần

### Permission issues

- Chạy PowerShell với quyền Administrator

## 📱 Hỗ trợ

Nếu gặp vấn đề, hãy:

1. Kiểm tra Docker Desktop đã khởi động
2. Kiểm tra file .env đã được tạo
3. Chạy `docker-compose logs` để xem lỗi chi tiết
