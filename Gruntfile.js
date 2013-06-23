/* jshint node: true, camelcase: false */

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var less_files = {};
  grunt.file.recurse('app/static/widgets',
    function (abspath, rootdir, subdir, filename) {
      if (grunt.file.isMatch('*.less', filename)) {
        less_files[abspath.replace(/\.less$/, '.css')] = abspath;
      }
    });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './app/static',
          cleanBowerDir: true
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'app/static/js/app/*.js',
        'app/static/widgets/*/*.js'
      ],
      options: {
        /* enforcing options */
        bitwise: false,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        es3: false,
        forin: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        plusplus: true,
        quotmark: 'single',
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        maxparams: 5,
        maxdepth: 5,
        maxstatements: 20,
        maxcomplexity: 5,
        maxlen: 80,
        /* relaxing options */
        browser: true,
        globals: {
          angular: true,
          $: true,
          EventSource: true
        }
      },
    },
    watch: {
      scripts: {
        files: [
          'app/static/js/app/*.js',
          'app/static/widgets/*/*.js',
          'app/static/widgets/*/*.less',
        ],
        tasks: ['jshint', 'less'],
      }
    },
    jsbeautifier: {
      files: [
        'Gruntfile.js',
        'app/static/js/app/*.js',
        'app/static/widgets/*/*.js'
      ],
      options: {
        indent_size: 2,
        jslint_happy: true
      }
    },
    less: {
      development: {
        files: less_files
      }
    }
  });

  grunt.registerTask('hint', 'jshint');
  grunt.registerTask('build', ['bower', 'jsbeautifier', 'jshint', 'less']);
  grunt.registerTask('default', ['jsbeautifier', 'jshint', 'less']);
};
