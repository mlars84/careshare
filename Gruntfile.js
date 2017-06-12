module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
    },
      my_target: {
        files: {
            //destination : [target]
            //min : [source code]
            'server/public/assets/scripts/controllers/careshare.controller.min.js': ['client/assets/scripts/controllers/careshare.controller.js'],
            'server/public/assets/scripts/services/careShareService.min.js': ['client/assets/scripts/services/careShareService.js'],
            'server/public/assets/scripts/clientapp.min.js': ['client/assets/scripts/clientapp.js'],
            'server/public/assets/scripts/controllers/login.controller.min.js': ['client/assets/scripts/controllers/login.controller.js'],
            'server/public/assets/scripts/services/loginService.min.js': ['client/assets/scripts/services/loginService.js'],
            'server/public/assets/scripts/controllers/profile.controller.min.js' : ['client/assets/scripts/controllers/profile.controller.js'],
            'server/public/assets/scripts/services/profileService.min.js': ['client/assets/scripts/services/profileService.js']
            //service and controller need to be separate
            }
          }
        },
          watch: {
            files: ['client/assets/*.js', 'client/assets/controllers/*.js', 'client/assests/services/*.js'],
            tasks: ['uglify']
          },
          // copy: {
          //   main: {
          //     // Allow creating the list of files dinamically (http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically)
          //     expand: true,
          //     // Execute the command from inside the /src folder
          //     cwd: '',
          //     // Also copy subfolders
          //     src: '',
          //     // Put the final files inside /dist
          //     dest: '',
          //   },
          // },
          // Configure grunt-remove-logging
          removelogging: {
            dist: {
              // Clean up all js file inside "dist" or its subfolders
              src: ['client/assets/*.js', 'client/assets/controllers/*.js',
              'client/assests/services/*.js', 'server/models/*.js', 'server/public/assets/*.js',
              'server/routes/*.js', 'server/strategies/*.js', 'server/app.js'],
            }
          }
          });//end uglify

      // grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks("grunt-remove-logging");
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-uglify');

      //grunt name

    grunt.registerTask('default', ['removelogging', 'uglify', 'watch']);
};
