module.exports = {

    build_expand: {
        options: {
            compress: false
        },
        files: {
            '<%= build.css %>': '<%= files.lib.less.main %>'
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
    },

    example: {
        options: {
            compress: false
        },
        files: {
            '<%= build.example.css %>': '<%= files.example.less.main %>'
        }

    }
};
