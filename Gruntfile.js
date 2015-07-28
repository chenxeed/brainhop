module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          baseUrl: 'public/javascripts/',
          mainConfigFile: 'public/javascripts/main.js',
          dir: 'build/javascripts/',
          modules: [
            {
              name: 'main'
            },
            {
              name: 'pages/index',
              exclude: ['main']
            }
          ]
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'public/javascripts/**/*.js'],
      options: {
        ignore: ['public/javascripts/lib/*.js', 'public/javascripts/lib/**/*.js']        
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/stylesheets',
          src: ['**/*.scss', '**/*.css'],
          dest: 'build/stylesheets',
          ext: '.css'
        }]
      }
    }
  });

  // Load the plugin that provides task
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'requirejs', 'sass']);

};