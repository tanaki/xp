function Brick (R) {
	
	this.path = null;

	this.init = function(R){

		this.path = R.rect(0, 0, 50, 20);
		this.path.attr({
			"stroke" : "none",
			"fill" : "#802A2A",
			"transform" : "t275,320"
		});

	};

	this.update = function(){
		this.path.toFront();
	};

	this.init(R);
}