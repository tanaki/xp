

SKI.initSocks = function(){

	SKI.Socks = [];

	var s = null;
	for ( var i = 0; i < 1; i ++ ) {
		s = new Sock(SKI.R);
		SKI.Socks.push(s);
	}
};

function Sock(R) {

	this.path = null;
	this.top = null;
	this.sockPath = null;

	this.init = function(R){

		this.sockPath = R.set();

		this.path = R.path("M0,0 L45,0 40,40 56,57 54,73 44,79 25,66 5,57");
		this.path.attr({
			"stroke" : "none",
			"fill" : "45-#c00-#d00"
		});

		this.top = R.rect(-3,-15,49,20);
		this.top.attr({
			"stroke" : "none",
			"fill" : "#f7f7f7"
		});

		this.sockPath.push(this.path, this.top);
		this.sockPath.attr({
			"transform" : "t220,320r20,0,0"
		});
	};

	this.init(R);
}