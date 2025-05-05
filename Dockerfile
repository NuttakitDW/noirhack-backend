# Use slim Bun image for smaller size
FROM oven/bun:1.2.12-slim

# Set working directory
WORKDIR /app

# Copy package definitions (use wildcard to avoid COPY errors if bun.lockb is missing)
COPY package.json bun.lockb* ./

# Install deps
RUN bun install

# Copy rest of the source
COPY . .

# Expose app port (change if not 3000)
EXPOSE 3000

# Run app
CMD ["bun", "run", "src/index.ts"]
