FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY src ./src
COPY .env.example ./.env
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "src/server.js"]
