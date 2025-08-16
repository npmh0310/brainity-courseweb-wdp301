# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm i --only=production --legacy-peer-deps

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm i --only=production --legacy-peer-deps && npm cache clean --force

# Copy built application
COPY --from=build /app ./

# Create uploads directory
RUN mkdir -p uploads && chown -R nodejs:nodejs uploads

# Change ownership of the app directory
RUN chown -R nodejs:nodejs .

# Switch to non-root user
USER nodejs

# Default environment variable for PORT (có thể override khi chạy container)
ENV PORT=8000
ENV NODE_ENV=production

# Expose port (dùng giá trị từ ENV)
EXPOSE ${PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:${process.env.PORT}/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["dumb-init", "node", "index.js"]
