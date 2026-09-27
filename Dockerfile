# Multi-stage Docker build for WasteConnect Fullstack MVP

# Stage 1: Build Client
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Production Server
FROM node:18-alpine
WORKDIR /app

# Copy server dependencies & code
COPY server/package*.json ./server/
RUN cd server && npm install --production

COPY server/ ./server/

# Copy built frontend assets to server public directory
COPY --from=client-builder /app/client/dist ./server/public

# Environment Defaults
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server/server.js"]
