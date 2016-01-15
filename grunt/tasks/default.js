module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'karma:unit',
        'ngtemplates:build',
        'concat:build',
        'clean:templates',
        'less:build_expand',
        'copy',
        'browserSync',
        'watch',
    ]);
};
