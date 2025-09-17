# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock nuxt.config.ts tsconfig.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Server
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/.output ./.output

# Exposer le port Nuxt
EXPOSE 3000

# Lancer l'app
CMD ["node", ".output/server/index.mjs"]