FROM alpine:3.6
LABEL maintainer="Laura Santamaria <laura.santamaria@rackspace.com>"

RUN apk add --update nodejs nodejs-npm ruby git build-base ruby-dev libffi-dev && rm -rf /var/cache/apk/*

RUN adduser -D -g "" -u 1000 node
RUN mkdir -p /home/node /usr/src/app /var/control-repo /var/npmdata/
RUN chown -R node:node /home/node /var/npmdata/

RUN gem install --no-document sass

COPY script/entrypoint /usr/src/app/script/entrypoint

VOLUME /var/control-repo
WORKDIR /var/control-repo
ENV NPM_CONFIG_CACHE /var/npmdata/.cache/
ENV TMPDIR /var/npmdata/.tmp/

USER node
ENTRYPOINT ["/usr/src/app/script/entrypoint"]
