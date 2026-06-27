# Development stage
FROM node:22-alpine AS development
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/tsconfig.json ./
COPY server/src ./src
COPY shared ../shared
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM node:22-alpine AS builder
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/tsconfig.json ./
COPY server/src ./src
COPY shared ../shared
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/server/dist ./dist
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1
CMD ["node", "dist/server/src/server.js"]
