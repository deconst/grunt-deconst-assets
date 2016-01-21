FROM alpine:3.2
MAINTAINER Ash Wilson <ash.wilson@rackspace.com>

RUN apk add --update nodejs git && rm -rf /var/cache/apk/*

RUN adduser -D node
RUN mkdir -p /home/node /usr/src/app /var/control-repo
RUN chown -R node:node /home/node

COPY script/entrypoint /usr/src/app/script/entrypoint

VOLUME /var/control-repo
WORKDIR /var/control-repo

USER node
ENTRYPOINT ["/usr/src/app/script/entrypoint"]
