module.exports = {

    example: {
        files: [{
            src: ['<%= files.example %>'],
            dest: '<%= build.root %>',
            flatten: true,
            expand: true,
        }]
    },

    vendor: {
        files: [{
            src: ['<%= files.vendor %>'],
            dest: '<%= build.vendor %>',
            flatten: true,
            expand: true,
        }]
    }

};
