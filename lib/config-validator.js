'use strict';

module.exports = function() {
    var reasons = [];

    if (
        typeof this.env.CONTENT_SERVICE_URL === 'undefined' &&
        typeof this.options.contentServiceUrl === 'undefined'
    ) {
        reasons.push('The environment variable CONTENT_SERVICE_URL has not been provided.');
    }

    if(
        typeof this.env.CONTENT_SERVICE_APIKEY === 'undefined' &&
        typeof this.options.contentServiceKey === 'undefined'
    ) {
        reasons.push('The environment variable CONTENT_SERVICE_APIKEY has not been provided.');
    }

    if(
        typeof this.env.TRAVIS_PULL_REQUEST !== 'undefined' ||
        this.options.travis
    ) {
        console.log(typeof this.env.TRAVIS_PULL_REQUEST !== 'undefined');
        console.log(typeof this.options.travis);
        console.log(typeof this.env.TRAVIS_PULL_REQUEST !== 'undefined' ||
        typeof this.options.travis);
        reasons.push('This looks like a pull request build on Travis.');
    }

    if(reasons.length === 0) {
        return false;
    }

    return reasons.join('\n');
};
