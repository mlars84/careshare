module.exports = function(grunt){
  grunt.initConfig({
    // grunt-remove-logging
    removelogging: {
      dist: {
        // Clean up all js file inside "dist" or its subfolders
        src: ['client/assets/scripts/controllers/careshare.controller.js',
              'client/assets/scripts/controllers/login.controller.js',
              'client/assets/scripts/controllers/profile.controller.js',
              'client/assets/scripts/services/careShareService.js',
              'client/assets/scripts/services/loginService.js',
              'client/assets/scripts/services/profileService.js',
              'client/assets/scripts/clientapp.js'],
      }
    }, //end removelogging
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
        }, //end uglify
          watch: {
            files: ['client/assets/*.js', 'client/assets/controllers/*.js', 'client/assests/services/*.js', 'server/assets/*.js', 'server/assets/controllers/*.js', 'server/assets/services/*.js'],
            tasks: ['uglify', 'removelogging']
          }
        });//end watch

      // grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks("grunt-remove-logging");
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['removelogging', 'uglify', 'watch']);
};
