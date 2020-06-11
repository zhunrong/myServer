FROM node:alpine

COPY . /home/node/

WORKDIR /home/node/

RUN yarn && yarn run build

CMD ["npm","run","start"]
