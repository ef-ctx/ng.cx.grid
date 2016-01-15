module.exports = {

    options: {
        banner: '<%= banner %>',
        process: function removeUseStrictStatement(src, filePath) {
            'use strict';

            return src.replace(/'use\ strict';/g, '');
        }
    },

    build: {
        src: ['<%= files.lib.js %>', '<%= build.tpl %>'],
        dest: '<%= build.js %>'
    },

    dist: {
        src: ['<%= files.lib.js %>', '<%= dist.tpl %>'],
        dest: '<%= dist.js %>'
    }

};
