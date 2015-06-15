var grunt = require('grunt');
var _ = require('lodash');

module.exports = function (config) {
    var fileContents = '';

    _.forEach(config.data, function (file, index, scope) {
        fileContents += '$' + index + ': \'' + file + '\';\n';
    });

    grunt.file.write(config.dest, fileContents);
};
