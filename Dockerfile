FROM node:17 AS base

WORKDIR /app

COPY package.json package-lock.json*  ./
RUN  npm ci

COPY . .

RUN npx prisma migrate deploy
RUN npm run build

# Abort if secret enviorment variables doesnt exist
# RUN if [ -z "$RIOT_KEY" ]; then echo 'Environment variable RIOT_KEY must be specified. Exiting.'; exit 1; fi

ENV NODE_ENV production



# USER nextjs

EXPOSE 3000

CMD ["node",".next/standalone/server.js"]