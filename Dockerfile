FROM alpine:3.2
MAINTAINER Ash Wilson <ash.wilson@rackspace.com>

RUN apk add --update nodejs ruby git && rm -rf /var/cache/apk/*

RUN adduser -D -g "" -u 1000 node
RUN mkdir -p /home/node /usr/src/app /var/control-repo
RUN chown -R node:node /home/node

RUN gem install --no-document sass

COPY script/entrypoint /usr/src/app/script/entrypoint

VOLUME /var/control-repo
WORKDIR /var/control-repo
ENV NPM_CONFIG_CACHE /var/control-repo/.cache/
ENV TMPDIR /var/control-repo/.tmp/

USER node
ENTRYPOINT ["/usr/src/app/script/entrypoint"]
