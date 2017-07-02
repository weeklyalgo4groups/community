#!/bin/bash

NAME=community-db

PORT_OUT=27017
PORT_IN=27017

# 建议改成3.2.10
IMAGE=mongo:latest

docker run \
    --rm \
    -d \
    --name $NAME\
    -v $(pwd)/../community.storage:/data/db \
    -p $PORT_OUT:$PORT_IN \
    $IMAGE
