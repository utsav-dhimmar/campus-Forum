FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the client package.json
COPY apps/client/package.json ./apps/client/

# Install dependencies
RUN pnpm install --filter=@repo/client

# Copy the rest of the client code
COPY apps/client ./apps/client

WORKDIR /app/apps/client

EXPOSE 5173

# Start the dev server
CMD ["pnpm", "dev", "--host"]
