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
      },
      specific: {
        files: {
          src: []
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'public/stylesheets',
          src: ['**/*.scss', '**/*.css'],
          dest: 'build/stylesheets',
          ext: '.css'
        }]
      }
    },
    watch: {
      scripts: {
        files: 'public/javascripts/**/*.js',
        tasks: ['jshint:specific'],
        options: {
          nospawn: true
        }
      },
      css: {
        files: 'public/stylesheets/**/*.scss',
        tasks: ['sass'],
        options: {
          nospawn: true
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // Set event on watch to only check updated files
  grunt.event.on('watch', function(action, filepath, target){
    var option;
    if(~filepath.indexOf('/javascripts/')){
      option = 'jshint.specific.files.src';
    }else if(~filepath.indexOf('/stylesheets/')){
      option = 'sass.files.src';
    }
    var result = [filepath];
    grunt.log.writeln(option + ' changed to ' + result);
    grunt.config(option, result);
  });

  // Load the plugin that provides task
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'requirejs', 'sass']);

};