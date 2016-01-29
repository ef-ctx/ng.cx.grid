module.exports = {

    options: {
        livereload: false
    },

    gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfiles'],
    },

    js: {
        files: '<%= files.lib.js %>',
        tasks: ['jshint:src', 'karma:unit', 'ngtemplates:build', 'concat:build', 'wrap']
    },

    tpl: {
        files: '<%= files.lib.tpl %>',
        tasks: ['ngtemplates:build', 'concat:build', 'wrap']
    },

    less: {
        files: '<%= files.lib.less.all %>',
        tasks: ['less:build_expand']
    },

    test: {
        files: ['<%= files.test %>'],
        tasks: ['jshint:test', 'karma:unit']
    },

    example: {
        files: ['example/**/*'],
        tasks: ['example']
    }

};
