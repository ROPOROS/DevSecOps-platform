# ---------- Build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

# ---------- Runtime stage ----------
FROM node:20-alpine

# Create non-root user
RUN addgroup -S roporosG && adduser -S roporos -G roporosG

WORKDIR /app

# Copy only what is needed from build stage
COPY --from=build /app /app

# Set ownership
RUN chown -R roporos:roporosG /app

USER roporos

EXPOSE 3000

CMD ["node", "index.js"]
