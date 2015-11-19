/*
 * grunt-deconst-assets
 * https://github.com/ktbartholomew/grunt-deconst-assets
 *
 * Copyright (c) 2015 Keith Bartholomew
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mime = require('mime-types');
var request = require('request');
var childProcess = require('child_process');
var ConfigService = require('../lib/services/config');

module.exports = function(grunt) {
    grunt.registerMultiTask('deconst_assets', 'Submits assets to a deconst asset store', function() {
        var task = this;
        var done = this.async();
        var taskFiles = grunt.file.expand({filter: 'isFile'}, this.options().files);
        var uploadedFiles = 0;
        var uploads = {};

        if(process.env.TRAVIS_PULL_REQUEST !== 'false') {
            return done();
        }

        if(ConfigService.load({env: process.env, options: this.options()}) !== true) {
            return grunt.fail.fatal(ConfigService.load({env: process.env, options: this.options()}));
        }

        var triggerUpdate = function () {
          var sha = childProcess.execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
          request.put({
              url: ConfigService.get('url') + '/control',
              headers: {
                  'Authorization': 'deconst apikey="' + ConfigService.get('key') + '"'
              },
              json: true,
              body: { sha: sha }
          }, done);
        };

        var afterUpload = function (uploads) {
            if( !this.options().output) {
                return triggerUpdate();
            }

            this.options().output.forEach(function (output, index, scope) {
                var formatter;

                try {
                    formatter = require('../lib/formatters/' + output.format);
                }
                catch (e) {
                    grunt.fail.fatal('\'' + output.format + '\' is not an allowed output format.');
                }

                formatter({dest: output.dest, data: uploads});
            });

            triggerUpdate();
        };

        taskFiles.forEach(function (file, index, scope) {
            var safeName = file.replace(/(\/|\.|\-)/g, '_');
            var formData = {};

            formData[safeName] = {
                value: fs.createReadStream(path.resolve(file)),
                options: {
                    contentType: mime.lookup(path.extname(file))
                }
            };

            request.post({
                url: ConfigService.get('url') + '/assets?named=true',
                headers: {
                    'Authorization': 'deconst apikey="' + ConfigService.get('key') + '"'
                },
                formData: formData
            }, function (error, response, body) {
                var jsonBody;

                try {
                    jsonBody = JSON.parse(body);
                }
                catch (e) {
                    console.warn(error);
                    grunt.fail.fatal(e);
                }

                uploads[safeName] = jsonBody[path.basename(file)];
                uploadedFiles++;

                console.log('%s of %s files uploaded.', uploadedFiles, scope.length);

                if(uploadedFiles === scope.length) {
                    afterUpload.bind(task)(uploads);
                }
            });
        });
    });
};
