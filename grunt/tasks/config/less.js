module.exports = {

    build_expand: {
        options: {
            compress: false
        },
        files: {
            '<%= build.css %>': '<%= files.lib.less.main %>'
        }
    },

    build_min: {
        options: {
            compress: true
        },
        files: {
            '<%= build.css_min %>': '<%= files.lib.less.main %>'
        }
    },

    dist_expand: {
        options: {
            compress: false
        },
        files: {
            '<%= dist.css %>': '<%= files.lib.less.main %>'
        }
    },

    dist_min: {
        options: {
            compress: true
        },
        files: {
            '<%= dist.css_min %>': '<%= files.lib.less.main %>'
        }
    }

};
