# ---- Build Stage ----
FROM node:20.9.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and prisma folder for postinstall
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Install dependencies and trigger postinstall (prisma generate)
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code and build the app
COPY . .
RUN pnpm build

# ---- Production Stage ----
FROM node:20.9.0-alpine AS prod

# Set working directory
WORKDIR /app

# Copy package files and prisma folder for postinstall
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Install production dependencies and trigger postinstall
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile --ignore-scripts
RUN pnpm prisma generate

# Copy build artifacts only
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 8000

# Start the blank service without touching the database
CMD ["pnpm", "start:prod"]
