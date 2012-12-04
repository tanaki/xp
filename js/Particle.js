
var Particle = function( _id ) {
	
	var 
		id = 0,

		init = function( _id ) {
			id = _id;
			
			
		},

		draw = function() {
			console.log("draw", id);
		};


	init(_id);
	return {
		draw : draw
	};

};