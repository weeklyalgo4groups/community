#!/bin/bash

NAME=community-db

PORT_OUT=27017
PORT_IN=27017

IMAGE=mongo:3.2.10

docker run \
    --rm \
    --name $NAME\
    -v $(pwd)/../community.storage:/data/db \
    -p $PORT_OUT:$PORT_IN \
    $IMAGE
