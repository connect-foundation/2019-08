#!/usr/bin/env bash

npm install --prefix client

npm run build --prefix client

mv client/build/* server/public/

npm install --prefix server

npm run serve --prefix server