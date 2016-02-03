module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    // Configure a mochaTest task to run unit tests
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/unit/*.js']
      }
    }

  });
  grunt.registerTask('default', ['mochaTest']);
}
