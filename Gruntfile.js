module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      default: {
        files:{
          'css/main.css': 'css/main.scss'
        }
      }
    }
   });

  grunt.registerTask('default', ['sass']);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  grunt.loadNpmTasks('grunt-contrib-sass');
};