FROM nginx:alpine

# Copy build đã upload sẵn
COPY build /usr/share/nginx/html

# (Tuỳ chọn) Copy config nếu dùng React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
