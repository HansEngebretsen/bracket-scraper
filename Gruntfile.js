module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                   src: [
                       'src/js/lib/*.js', // All JS in the libs folder
                       'src/js/production.js',
                       'src/js/modules/*.js'

                   ],
                   dest: 'public/js/production.js',
            }
          },


        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceComments: 'true',
                    sourcemap: 'file'
                },
                files: {
                    'public/css/style.css': 'src/scss/style.scss'
                }
            }
        },
         autoprefixer: {
            options: {
              browsers: ['last 3 versions', '> 5%','ie 8', 'ie 7','ie 9']
            },
            dist: {
                files: {
                    'public/css/style.css': 'public/css/style.css'
                }
            }

        },

       watch: {

            options: { livereload: true },
            scripts: {
              files: ['src/js/**/*.js'],
              tasks: ['concat'],
              options: {
                spawn: false,
              }
            },
            css: {
              files: ['src/scss/**/**/**/*.scss'],
              tasks: ['sass', 'autoprefixer'],
              options: {
                spawn: false,
              }
            }
        }



    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['concat', 'sass', 'autoprefixer']);
};