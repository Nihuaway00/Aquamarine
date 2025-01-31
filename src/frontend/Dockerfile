FROM node:slim
WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

EXPOSE 80

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

#CMD ["npm", "run", "--host", "dev"]
RUN npm run build

CMD ["serve", "-s", "dist", "-p", "80"]