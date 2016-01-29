module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('example', [
        'copy:example_index',
        'ngtemplates:example',
        'concat:example',
        'less:example'
    ]);
};
