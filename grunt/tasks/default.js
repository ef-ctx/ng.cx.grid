module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'karma:unit',
        'ngtemplates:build',
        'concat:build',
        'less:build_expand',
        'copy:vendor',

        'example',

        'clean:templates',
        'browserSync',
        'watch',
    ]);
};
