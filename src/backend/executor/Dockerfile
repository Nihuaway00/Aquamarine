FROM node:slim
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install pm2 -g
# Start app
CMD ["pm2-runtime", "start", "ecosystem.config.js"]