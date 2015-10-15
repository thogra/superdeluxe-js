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
    compress: {
      main: {
        options: {
          archive: 'spid-sdk-<%= pkg.version %>.zip'
        },
        files: [
          {
            src: ['dist/**'], // What should be included in the zip
            dest: 'dist/'
          },
        ]
      }
    },
    "release-it": {
      options: {
         pkgFiles: ['package.json', 'bower.json']
      }
    },
    "github-release": {
      options: {
        repository: 'thogra/superdeluxe-js',
        release: {
          tag_name: grunt.file.readJSON('package.json').version,
          name: grunt.file.readJSON('package.json').version
        },
        auth: {
          username: process.env.GITHUB_ACCESS_TOKEN,
          password: ''
        }
      },
      files: {
        src: ['dist/spid-sdk-<%= pkg.version %>.zip']
      }
    }
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-github-releaser');
  grunt.loadNpmTasks('grunt-release-it');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['uglify']);

  grunt.registerTask('post-release', function() {
    grunt.log.subhead("Released!");
    grunt.log.ok("You need to upload the dist/relase.zip to the GitHub relase your damn self.");
  });
  grunt.registerTask('release', ['uglify','compress','release-it', 'post-release']);
  //grunt.registerTask('pre-release', ['build','compress']);
  //grunt.registerTask('release', ['build','compress', 'github-release']);
};
