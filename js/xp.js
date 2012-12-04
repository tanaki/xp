
var XP = window.XP || {

	stats : null,
	snowflake : null,
	frame : 0,

	init : function() {
		
		this.addStats();
		this.snowflake = new Snowflake();
		requestAnimationFrame(XP.draw);
	},

	draw : function() {

		XP.snowflake.draw();

		XP.frame++;
		if ( XP.frame < 100 )
			requestAnimationFrame(XP.draw);
	},

	addStats : function() {

		this.stats = new Stats();
		this.stats.setMode(0);

		this.stats.domElement.style.position = 'fixed';
		this.stats.domElement.style.right = '0px';
		this.stats.domElement.style.top = '0px';

		document.body.appendChild( this.stats.domElement );

	}
};

XP.init();