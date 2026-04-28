FROM node:22-slim

WORKDIR /app

# Install pnpm and build tools
RUN corepack enable && corepack prepare pnpm@latest --activate


# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the server package.json
COPY apps/server/package.json ./apps/server/

# Install dependencies
RUN pnpm install --filter=@repo/server

# Copy the rest of the server code
COPY apps/server ./apps/server

WORKDIR /app/apps/server

EXPOSE 8000

# Start the application
CMD ["node", "src/index.js"]
