var ConfigData = {};

var ConfigService = {
    get: function (key) {
        return ConfigData[key];
    },
    load: function (config) {
        var valid = this.validate(config);

        if(valid !== true) {
            return valid;
        }

        ConfigData.url = config.env.CONTENT_SERVICE_URL || config.options.contentServiceUrl;
        ConfigData.key = config.env.CONTENT_SERVICE_APIKEY || config.options.contentServiceKey;

        return valid;
    },
    validate: function(config) {
        var reasons = [];

        if (
            typeof config.env.CONTENT_SERVICE_URL === 'undefined' &&
            typeof config.options.contentServiceUrl === 'undefined'
        ) {
            reasons.push('The environment variable CONTENT_SERVICE_URL has not been provided.');
        }

        if(
            typeof config.env.CONTENT_SERVICE_APIKEY === 'undefined' &&
            typeof config.options.contentServiceKey === 'undefined'
        ) {
            reasons.push('The environment variable CONTENT_SERVICE_APIKEY has not been provided.');
        }

        if(
            typeof config.env.TRAVIS_PULL_REQUEST !== 'undefined' ||
            config.options.travis
        ) {
            reasons.push('This looks like a pull request build on Travis.');
        }

        if(reasons.length === 0) {
            return true;
        }

        return reasons.join('\n');
    }
};

module.exports = ConfigService;
