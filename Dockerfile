FROM node:0.12
MAINTAINER Ash Wilson <ash.wilson@rackspace.com>

RUN useradd node
RUN mkdir -p /home/node /usr/src/app /var/control-repo
RUN chown -R node:node /home/node
RUN npm install -g grunt-cli

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g .

VOLUME /var/control-repo
WORKDIR /var/control-repo

USER node
ENTRYPOINT ["/usr/src/app/script/entrypoint"]
