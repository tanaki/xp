
var Snowflake = function() {
	
	var 
		particles = [],

		init = function() {
			for ( var i = 0; i < 5; i++ ) {
				particles.push( new Particle(i) );
			}
		},


		draw = function() {
			for ( var i = 0; i < 5; i++ ) {
				particles[i].draw();
			}
		};


	init();
	return {
		draw : draw
	};

};