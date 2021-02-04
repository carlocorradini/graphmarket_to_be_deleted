FROM node:lts

WORKDIR /graphmarket

COPY tsconfig.common.json .

WORKDIR /graphmarket/packages/graphmarket-service-purchases

COPY /packages/graphmarket-service-purchases/package.json .

RUN npm install

COPY /packages/graphmarket-service-purchases .

CMD ["npx", "ts-node", "-r", "tsconfig-paths/register", "src/bootstrap.ts"]
