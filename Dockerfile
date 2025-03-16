FROM node:lts-alpine

RUN apk add openssl zlib libgcc

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY ./prisma/schema.prisma ./prisma/schema.prisma

COPY . .

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
