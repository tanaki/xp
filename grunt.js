/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',

		concat: {
			dist: {
				src: ['dev/src/**/*.js'],
				dest: 'build/js/<%= pkg.namespace %>.js'
			}
		},
		min: {
			dist: {
				src: '<config:depconcat.dist.dest>',
				dest: 'build/js/<%= pkg.namespace %>.min.js'
			}
		},
		lint: {
			files: ['grunt.js', 'dev/src/**/*.js']
		},
		less: {
			development: {
				files: {
					"build/css/style.css": "dev/less/style.less"
				}
			}
		},
		watch: {
			files: ['dev/src/**/*.js', 'dev/less/*.less'],
			tasks: 'default'
		}
	});

	// Custom tasks
	grunt.registerTask('default', 'less lint concat');
	grunt.registerTask('deploy', 'less lint depconcat min');


};
