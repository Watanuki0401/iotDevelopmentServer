FROM node:lts-bullseye-slim

ARG UID \
    GID

RUN usermod -u ${UID} node && \
    groupmod -g ${GID} node
USER node
WORKDIR /app/container-app