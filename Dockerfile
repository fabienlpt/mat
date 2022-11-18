FROM node:19 AS api

WORKDIR /api
COPY ./api .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]

FROM node:19 AS app

WORKDIR /app
COPY ./app .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]