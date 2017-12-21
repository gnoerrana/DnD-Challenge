

// 'use strict';
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  var jsFileList = [
    // 'bower_components/jquery/dist/jquery.js',
    // 'bower_components/bootstrap/dist/js/bootstrap.js',
    // 'js/header.js'
    // 'bower_components/bootstrap/js/collapse.js',
    // 'bower_components/bootstrap/js/carousel.js',
    // 'bower_components/bootstrap/js/dropdown.js',
    // 'bower_components/bootstrap/js/modal.js',
    // 'src/js/script.js'

  ];

  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        // jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        // 'js/**'
        // '!bower_components/bootstrap/js/*.js',
        // '!js/**',
        // '!css/**',
      ]
    },
    less: {
      dev: {
        files: { 
          'css/main.css': 'less/theme.less'
        },
        options:{
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: "/css/main.css.map",
          sourceMapFilename: "css/main.css.map"
        }
      },
      build: {
        files: {
          'css/main.min.css': 'less/theme.less'
        },
        options: {
          compress: true
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'js/script.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'js/script.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'css/'
          }
        },
        src: 'css/main.css'
      },
      build: {
        src: 'css/main.min.css'
      }
    },
    watch: {
      less: {
        files: [
          'less/*.less',
          'less/**/*.less'
        ],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        // tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'css/main.css',
          'js/script.js'
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'dev'
  ]);

  grunt.registerTask('dev', [
    // 'jshint',
    'less:dev',
    'autoprefixer:dev',
    'concat'
  ]);

  grunt.registerTask('build', [
    // 'jshint',
    'less:build',
    // 'autoprefixer:build',
    'uglify'
  ]);
};
