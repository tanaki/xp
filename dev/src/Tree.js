
SKI.initTree = function(){

	SKI.Tree = new Tree(SKI.R);

};

function Tree(R) {


	this.init = function(R){

		this.sapin = R.path("M0,0 L40,80 -40,80Z M0,50 L60,160 -60,160Z M0,120 L80,240 -80,240Z");
		this.sapin.attr({
			"stroke" : "none",
			"fill" : "90-#030:10-#060",
			"transform" : "t950,320"
		});


	};

	this.init(R);

}