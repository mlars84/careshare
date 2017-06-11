module.exports = function(grunt){

    grunt.initConfig({
      uglify: {
        my_target: {
          options: {
            mangle: false
          },
          files: {
            //destination : [target]
            //min : [source code]
            '/assets/scripts/controllers/profile.controller.min.js' : ['/assets/scripts/src/profile.controller.js'],
            '/assets/scripts/controllers/login.controller.min.js': ['/assets/scripts/src/login.controller.js'],
            '/assets/scripts/services/careShareService.min.js': ['/assets/scripts/src/careShareService.js'],
            '/assets/scripts/clientapp.min.js': ['/assets/scripts/src/clientapp.js']
            //service and controller need to be separate
            }
          }
        },
          watch: {
            files: ['client/scripts/*.js'],
            tasks: ['uglify']
          },
          copy: {
            main: {
              // Allow creating the list of files dinamically (http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically)
              expand: true,
              // Execute the command from inside the /src folder
              cwd: 'src',
              // Also copy subfolders
              src: '**',
              // Put the final files inside /dist
              dest: 'dist/',
            },
          },
          // Configure grunt-remove-logging
          removelogging: {
            dist: {
              // Clean up all js file inside "dist" or its subfolders
              src: "**",
            }
          }
          });//end uglify

      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-remove-logging');

      //grunt name

    grunt.registerTask('default', ['copy', 'watch', 'removelogging']);
};
