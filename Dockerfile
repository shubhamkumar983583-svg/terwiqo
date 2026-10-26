# Multi-stage Dockerfile for WorkPulse AI Enterprise Stack
# Stage 1: Base & Dependencies
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder
FROM dependencies AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Stage 3: API Runtime
FROM node:22-alpine AS api-runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./
EXPOSE 8080
CMD ["node", "--loader", "tsx", "server.ts"]

# Stage 4: Web Dashboard Runtime
FROM node:22-alpine AS web-runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
