module.exports = {
    coverage: ['<%= coverage.root %>'],
    build: ['<%= build.root %>'],
    dist: ['<%= dist.root %>'],
    templates: ['<%= build.tpl %>', '<%= dist.tpl %>', '<%=build.example.tpl %>']
};
