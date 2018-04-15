FROM node:8-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY . .

EXPOSE 8080
CMD ["node", "lib/index.js"]
