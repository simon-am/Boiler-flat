module.exports = function(grunt) {

    var theme_path = 'site/user/themes/communicator/assets'

	var appFiles = [
        theme_path + '/js/plugin.work-list.js',
        theme_path + '/js/plugin.carousel.js',
		theme_path + '/js/app.js',
	];

	var libFiles = [
		theme_path + '/js/jquery-min.js',
        theme_path + '/js/plugins.js',
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					includePaths: require('node-bourbon').includePaths,
					outputStyle: 'compressed'
				},
				files: {
					'site/user/themes/communicator/assets/compiled/style.min.css' : theme_path + '/scss/style.scss'
				}
			}
		},
		watch: {
			css: {
				files: theme_path + '/scss/**/*.scss',
				tasks: [
					'sass',
					//'string-replace:css',
				]
			},
			js_lib: {
				files: libFiles,
				tasks: [
					'uglify:lib',
					'concat',
					//'string-replace:js',
				]
			},
			js_app: {
				files: appFiles,
				tasks: [
					'jshint',
					'uglify:app',
					'concat',
					//'string-replace:js',
				]
			}
		},
		uglify: {
			app: {
				options: {
				},
				files: {
					'site/user/themes/communicator/assets/js/_app.min.js': appFiles
				}
			},
			lib: {
				options: {
				},
				files: {
					'site/user/themes/communicator/assets/js/_lib.min.js': libFiles
				}
			}
		},
	    
		'string-replace': {
			js: {
				files: {
					'public/_footer.html': 'public/_footer.html'
				},
				options: {
					replacements: [
						{
							pattern: /\.min\.js\?v=([0-9]+)/g,
							replacement: function (match, p1) {
				           		return '.min.js?v=' + Math.floor(Date.now() / 1000);
				            }
						}
					]
				}
			},
			css: {
				files: {
					'public/_header.html': 'public/_header.html'
				},
				options: {
					replacements: [
						{
							pattern: /\.min\.css\?v=([0-9]+)/g,
							replacement: function (match, p1) {
				           		return '.min.css?v=' + Math.floor(Date.now() / 1000);
				            }
						}
					]
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.registerTask('build',[
		'sass',
		'jshint',
		'uglify:lib',
		'uglify:app',
		'concat',
		'string-replace',
	]);
	grunt.registerTask('default',[
		'watch',
	]);
}
