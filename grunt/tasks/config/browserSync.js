module.exports = {
    bsFiles:['<%= build.root%>/**/*'],
    options: {
        server: {
            baseDir: '<%= build.root%>'
        },
        watchTask: true
    }
};
