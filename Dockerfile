# ---- builder ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest && npm i

# ---- runtime ----
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm install -g npm@latest && chown -R node:node /app
USER node
EXPOSE 5173
CMD ["npm", "start"]