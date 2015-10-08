module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n',

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      main: {
        src: 'src/superdeluxe.js',
        dest: 'dist/superdeluxe.min.js'
      }
    },
    'release-it': {
        options: {
            pkgFiles: ['package.json'],
            commitMessage: 'Release %s',
            tagName: '%s',
            tagAnnotation: 'Release %s',
            buildCommand: false
        }
    }
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Default task.
  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('release', ['uglify', 'release-it']);
};
