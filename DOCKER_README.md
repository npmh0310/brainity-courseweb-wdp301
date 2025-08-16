# Brainity Course Web - Docker Setup

## Tổng quan

Dự án này sử dụng Docker để containerize cả frontend (React) và backend (Node.js) cùng với MongoDB database.

## Cấu trúc Docker

```
├── client/
│   ├── Dockerfile          # Production build cho React
│   ├── Dockerfile.dev      # Development với hot reload
│   ├── nginx.conf          # Cấu hình nginx cho client
│   └── .dockerignore
├── server/
│   ├── Dockerfile          # Production build cho Node.js
│   ├── init-mongo.js       # Script khởi tạo MongoDB
│   └── .dockerignore
├── nginx/
│   └── nginx.conf          # Reverse proxy cho production
├── docker-compose.yml      # Orchestration chính
└── DOCKER_README.md        # File này
```

## Cách sử dụng

### 1. Production Mode

```bash
# Build và chạy tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### 2. Development Mode

```bash
# Chạy với development profile
docker-compose --profile development up -d

# Chạy chỉ MongoDB và server
docker-compose up mongodb server-dev -d

# Chạy chỉ MongoDB và client
docker-compose up mongodb client-dev -d
```

### 3. Production với Nginx

```bash
# Chạy với nginx reverse proxy
docker-compose --profile production up -d
```

## Ports

- **Client (React)**: http://localhost:3000
- **Server (Node.js)**: http://localhost:8000
- **MongoDB**: localhost:27017
- **Nginx**: http://localhost:80 (production mode)

## Environment Variables

Tạo file `.env` từ template sau:

```bash
# Server Configuration
NODE_ENV=production
PORT=8000

# MongoDB Configuration
MONGO_URI=mongodb://admin:password123@mongodb:27017/brainity?authSource=admin

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
COOKIE_KEY=your-super-secret-cookie-key-change-in-production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-app-password

# Client Configuration
REACT_APP_API_URL=http://localhost:8000
REACT_APP_SOCKET_URL=http://localhost:8000
```

## Commands hữu ích

### Xem trạng thái containers

```bash
docker-compose ps
```

### Rebuild images

```bash
docker-compose build --no-cache
```

### Xem logs của service cụ thể

```bash
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f mongodb
```

### Truy cập MongoDB shell

```bash
docker-compose exec mongodb mongosh -u admin -p password123
```

### Backup MongoDB

```bash
docker-compose exec mongodb mongodump --out /data/backup --db brainity
```

### Restore MongoDB

```bash
docker-compose exec mongodb mongorestore --db brainity /data/backup/brainity
```

## Troubleshooting

### 1. Port conflicts

Nếu có port conflicts, thay đổi ports trong `docker-compose.yml`:

```yaml
ports:
  - "3001:80" # Thay vì 3000:80
```

### 2. Permission issues

```bash
# Fix permissions cho uploads folder
sudo chown -R $USER:$USER server/uploads
```

### 3. Memory issues

Tăng memory limit trong Docker Desktop hoặc thêm memory limits:

```yaml
services:
  mongodb:
    deploy:
      resources:
        limits:
          memory: 1G
```

### 4. Clean up

```bash
# Xóa tất cả containers, networks, volumes
docker-compose down -v --remove-orphans

# Xóa tất cả images
docker system prune -a
```

## Production Deployment

### 1. SSL/HTTPS

Uncomment HTTPS configuration trong `nginx/nginx.conf` và thêm SSL certificates.

### 2. Environment Variables

Sử dụng Docker secrets hoặc external environment management.

### 3. Monitoring

Thêm health checks và monitoring tools như Prometheus, Grafana.

### 4. Backup Strategy

Thiết lập automated backups cho MongoDB và uploads folder.

## Security Notes

- Thay đổi tất cả default passwords
- Sử dụng strong JWT secrets
- Enable rate limiting
- Configure CORS properly
- Use HTTPS in production
- Regular security updates
