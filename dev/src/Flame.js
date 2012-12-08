
SKI.initBackground = function(){
	this.BG = SKI.R.rect(0,0,200,150);
	this.BG.attr({
		"stroke" : "none",
		"fill" : "#000",
		"x" : 440,
		"y" : 345
	});

	this.BGLight = SKI.R.rect(0,0,180,128);
	this.BGLight.attr({
		"stroke" : "none",
		"fill" : "#333",
		"x" : 450,
		"y" : 356
	});
};

SKI.initFire = function(){

	SKI.Flames = [];
	var
		f = null,
		s = [ 0.5, 0.5, 0.7, 0.7, 1 ],
		r = [-60, 60, -30, 30, 0];

	for ( var i = 0; i < 5; i++ ) {
		f = new Flame(SKI.R, s[i], r[i]);
		SKI.Flames.push(f);
	}
};

function Flame ( R, s, r ){
	
	this.path = null;
	this.rotation = 0;
	this.scale = 1;

	this.init = function( R, s, r ){

		this.rotation = r;
		this.scale = s;

		this.path = R.path("M50,0 L80,100 50,120 20,100 50,0");
		this.path.attr("stroke", "none");

	};

	this.update = function(){

		var 
			gradientVal = Math.round( Math.random() * 60 + 20 ),
			rand = Math.random(),
			rotationVal = this.rotation + ( rand > 0.5 ? -rand / 2 : rand / 2),
			scaleVal = this.scale + ( rand > 0.5 ? -0.01 : 0.01 );

		this.path.remove();
		this.path = R.path("M50,0 L80,100 50,120 20,100 50,0");
		this.path.attr({
			"stroke" : "none",
			"fill" : "90-#f00-#ff0:"+gradientVal,
			"transform" : "t490,365r"+rotationVal+",50,100s"+scaleVal+","+scaleVal
		});
	};

	this.init(R, s, r);
}