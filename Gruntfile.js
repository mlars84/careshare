module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    // Configure grunt-contrib-copy
    copy: {
      main: {
        // Allow creating the list of files dinamically (http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically)
        expand: true,
        // Execute the command from inside the /src folder
        cwd: 'server',
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
        src: "assets/**/*.js",
      }
    },
    uglify: {
    my_target: {
      files: {
        'server/uglify.min.js': ['/assets/scripts/services/careShareService.js',
        '/assets/scripts/services/loginService.js',
        '/assets/scripts/controllers/profile.controller.js',
        '/assets/scripts/clientapp.js']
      }
    }
  }
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-remove-logging");
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default', ['copy', 'removelogging']);
};
