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
var validateConfig = require('../lib/config-validator');

module.exports = function(grunt) {
    grunt.registerMultiTask('deconst_assets', 'Submits assets to a deconst asset store', function() {
        var task = this;
        var done = this.async();
        var uploadedFiles = 0;
        var uploads = [];

        if(validateConfig.bind({env: process.env, options: this.options()})() !== false) {
            return grunt.fail.fatal(validateConfig.bind({env: process.env, options: this.options()})());
        }

        var afterUpload = function () {
            console.log(uploads);
            done(uploads);
        };

        var taskFiles = grunt.file.expand({filter: 'isFile'}, this.options().files);

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
                url: task.options().contentServiceUrl + '/assets?named=true',
                headers: {
                    'Authorization': 'deconst apikey="' + task.options().contentServiceKey + '"'
                },
                formData: formData
            }, function (error, response, body) {
                var jsonBody = JSON.parse(body);
                uploads.push({
                    safeName: safeName,
                    url: jsonBody[path.basename(file)]
                });

                uploadedFiles++;

                console.log('%s of %s files uploaded.', uploadedFiles, scope.length);

                if(uploadedFiles === scope.length) {
                    afterUpload();
                }
            });
        });
    });

};
