# Development stage
FROM node:22-alpine AS development
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/index.html client/vite.config.ts client/tsconfig*.json ./
COPY client/public ./public
COPY client/src ./src
COPY shared ../shared
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Build stage
FROM node:22-alpine AS builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
COPY shared ../shared
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=builder /app/client/dist /usr/share/nginx/html
COPY docker/nginx-spa.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:80 || exit 1
CMD ["nginx", "-g", "daemon off;"]
