module.exports = {
    example_index: {
        files: [{
            src: ['<%= files.example.index %>'],
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
