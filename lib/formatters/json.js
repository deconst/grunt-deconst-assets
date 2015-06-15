var grunt = require('grunt');
var _ = require('lodash');

module.exports = function (config) {
    grunt.file.write(config.dest, JSON.stringify(config.data, null, 4));
};
