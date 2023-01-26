FROM node:19-alpine as build

WORKDIR /app

COPY . .