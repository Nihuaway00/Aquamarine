FROM node:slim
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

# Start app
CMD ["node", "dist/main.js"]