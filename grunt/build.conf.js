module.exports = {

    build: {
        root: 'build/',
        js: 'build/<%= pkg.name %>.js',
        css: 'build/<%= pkg.name %>.css',
        tpl: 'build/<%= pkg.name %>.tpl.js',
        vendor: 'build/vendor'
    },

    dist: {
        root: 'dist',
        js: 'dist/<%= pkg.name %>.js',
        js_min: 'dist/<%= pkg.name %>.min.js',
        css: 'dist/<%= pkg.name %>.css',
        css_min: 'dist/<%= pkg.name %>.min.css',
        tpl: 'dist/<%= pkg.name %>.tpl.js'
    },

    coverage: {
        root: 'coverage'
    },

    // SOURCES

    files: {

        lib: {
            js: ['src/**/*.js', '!src/**/*.spec*.js'],
            tpl: ['src/**/*.html'],
            less: {
                main: 'src/ng.cx.grid.less',
                all: ['src/**/*.less']
            }
        },

        example: ['example/**/*'],

        grunt: ['Gruntfile.js', 'grunt/**/*.js'],

        test: ['src/**/*.spec*.js'],

        vendor: [
            'vendor/angular/angular.js',
            'vendor/angular-touch/angular-touch.js',
        ],

        testVendor: 'vendor/angular-mocks/angular-mocks.js'

    },

    banner: '/**********************************************************' +
        '\n * ' +
        '\n * <%= pkg.name %> - v<%= pkg.version %>' +
        '\n * ' +
        '\n * Release date : <%= grunt.template.today("yyyy-mm-dd : HH:MM") %>' +
        '\n * Author       : <%= pkg.author.name %> ' +
        '\n * License      : <%= pkg.license.type %> ' +
        '\n * ' +
        '\n **********************************************************/' +
        '\n\n\n\n'

};
