FROM node:slim
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV PORT 3000
EXPOSE 3000

# Start app
CMD ["node", "dist/main.js"]