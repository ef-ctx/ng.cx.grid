module.exports = {
    dist: {
        src: ['<%= dist.js %>'],
        dest: '<%= dist.js %>',
        options: {
            wrapper: [
                '(function (angular) {\n\t\'use strict\';\n',
                '\n}(angular));'
            ],
            indent: '\t'
        }
    }
};
