module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['../app/**/*.js'], 
      options: {
        predef: ["document", "console", "$" ], 
        esnext: true, 
        browser: true,
        globalstrict: true,
        globals: {"angular": true, "app": true, "$http": true},
      }
    },

    watch: { 
      javascripts: {
        files: ['../app/**/*.js'], 
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'watch']);
};