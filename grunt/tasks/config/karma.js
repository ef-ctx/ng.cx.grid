module.exports = {

    unit: {
        singleRun: true,
        reporters: ['dots', 'coverage'],
        browsers: [
            'PhantomJS2'
        ]
    },

    debug: {
        singleRun: false,
        reporters: ['dots'],
        browsers: [
            'Chrome'
        ]
    },

    options: {
        basePath: './',

        files: [
            '<%= files.vendor %>',
            '<%= files.testVendor %>',
            '<%= files.lib.js %>'
        ],

        preprocessors: {
            'src/**/*.js': 'coverage'
        },

        frameworks: ['jasmine'],

        plugins: ['karma-jasmine', 'karma-coverage', 'karma-chrome-launcher', 'karma-phantomjs2-launcher'],

        reporters: ['dots', 'covergae'],

        urlRoot: '/',

        autoWatch: false,

        client: {
            captureConsole: true
        },

        singleRun: true,

        browsers: [
            'PhantomJS2'
        ]
    }

};
