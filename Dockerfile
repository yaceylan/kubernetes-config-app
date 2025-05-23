FROM node:lts-alpine

WORKDIR /app

COPY backend/package*.json backend/package-lock.json ./

RUN npm ci

COPY backend/ .

EXPOSE 3000

CMD ["node", "app.js"]