FROM node:20-slim as base
RUN apt-get update -y && apt-get install -y openssl
ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/postgres?connect_timeout=300"

# ! unable to connect to database by prisma on building
# FROM base AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY ./prisma ./prisma
# RUN npx prisma generate
# COPY . .
# RUN DATABASE_URL="postgresql://postgres:postgres@db:5432/postgres?connect_timeout=300" npm run build

FROM base AS run
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# copy from source code
COPY ./public ./public
# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
# copy from source code
COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static

USER nextjs

ENV PORT=3000

EXPOSE 3000

CMD HOSTNAME="0.0.0.0" node server.js