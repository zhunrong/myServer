FROM node:alpine

COPY . /home/node/

WORKDIR /home/node/

CMD ["npm","run","server"]