#!/bin/bash
DB=community-db
# node:latest 换成node:8-alpine
docker run \
    --rm \
    --name community\
    -i \
    -v $(pwd):/app \
    -p 5002:3000 \
    --link $DB:mongo \
    node:8-alpine \
    /bin/sh -c "cd /app && npm i --registry=https://registry.npm.taobao.org && npm run dev"
