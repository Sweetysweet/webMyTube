FROM donbotinc/tars-cli:latest as builder

LABEL stage=intermediate

COPY ./package*.json ./project/
WORKDIR /project/
RUN npm install

COPY ./ /project/


RUN TARS_ENV="stage" tars build -m


FROM node:9.11.1-alpine
WORKDIR /

COPY ./mockapi/package*.json ./
RUN npm install

COPY ./mockapi/ ./
COPY --from=builder /project/build/ /public/

EXPOSE 3000
CMD [ "npm", "run", "api" ]
