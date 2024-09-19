FROM node:20.12.2-bullseye-slim AS builder

WORKDIR /app

COPY package*.json ./

COPY ./prisma ./prisma

RUN npm install
RUN npm install @prisma/client

COPY . .

RUN npm run build

FROM node:20.12.2-bullseye-slim AS runner

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/start.sh ./start.sh
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN chmod +x start.sh

CMD ["./start.sh"]