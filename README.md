# Skeleton of a node.js / typescript / express / postgres app

## Install Node / NPM

https://docs.npmjs.com/getting-started/installing-node

## Install TypeScript

https://www.npmjs.com/package/typescript

## Create database `StreamData` in your Postgres DB:

create database `StreamData`

## run below command to initialize database

run `yarn initdb`

## Set the following ENV VARs for your DB Connections:

`POSTGREURL="postgresql://[yourUserName]:[yourPassword]@localhost:5432/StreamData`

this can also be done by creating a `.env` file in the root of this project see `.env` for a reference

## Transpile TypeScript to the build folder

run `tsc`

you can adjust transpiling settings in tsconfig.json

## Run your built node app

run `yarn start`

## Run your tests

run `yarn start`
