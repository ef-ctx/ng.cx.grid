module.exports = {
    options: {
        module: 'ng.cx.grid',
        htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
    },

    build: {
        src: '<%= files.lib.tpl %>',
        dest: '<%= build.tpl %>'
    },

    dist: {
        options: {},

        src: '<%= files.lib.tpl %>',
        dest: '<%= dist.tpl %>'
    }
};
