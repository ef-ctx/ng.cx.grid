module.exports = {

    compile: {

        options: {
            banner: '<%= banner %>'
        },

        files: {
            '<%= dist.js_min %>': '<%= dist.js %>'
        }

    }

};
