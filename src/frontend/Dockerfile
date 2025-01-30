FROM node:slim
WORKDIR /app
COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

CMD ["serve", "-s", "dist"]