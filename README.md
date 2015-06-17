# grunt-deconst-assets

> Submits assets to a deconst asset store

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-deconst-assets --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-deconst-assets');
```

## The "deconst_assets" task

### Overview
In your project's Gruntfile, add a section named `deconst_assets` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    deconst_assets: {
        images: {
            options: {
                contentServiceUrl: 'http://content:9000/',
                contentServiceKey: '1234567890',
                files: ['src/images/**/*'],
                output: [
                    dest: 'src/less/image-urls.less',
                    format: 'less'
                ]
            }
        },
    },
});
```

### Options

#### options.contentServiceUrl
Type: `String`

The URL to your content service **with a trailing slash**. Alternatively, you can set the CONTENT_STORE_URL environment variable to this value.

#### options.contentServiceKey
Type: `String`

The API key used to authenticate with your content service. Alternatively, you can set the CONTENT_STORE_APIKEY environment variable to this value.

#### options.files
Type: `String|Array`

A glob pattern matching all the files you wish to upload to the deconst content service.


#### options.output
Type: `Object`

_(Optional)_ Specifies a file that will be written with all of the final URLs of the uploaded files. Useful if you have CSS or JavaScript that needs to know these URLs.

#### options.output.dest
Type: `String`

A file that will be written with the uploaded files' URLs

#### options.output.format
Type: `String`

The expected format for the list of URLs. Possible values:

* `json`
* `less`
* `sass`
* `scss`
