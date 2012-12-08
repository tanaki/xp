SKI.initWindow = function(){
	SKI.SnowWindow = new SnowWindow(SKI.R);
};

function SnowWindow(R){

	this.path = null;
	this.windowFrame = null;
	this.windowGlass = null;
	this.bar1 = null;
	this.bar2 = null;
	this.snow = [];
	this.snowPos = [];

	this.init = function(R) {

		this.path = R.set();

		var whiteAttr = {
			"stroke" : "none",
			"fill" : "#E7e7e7"
		};

		this.windowFrame = R.rect(0,0,150,130);
		this.windowFrame.attr(whiteAttr);

		this.windowGlass = R.rect(5,5,140,120);
		this.windowGlass.attr({
			"stroke" : "none",
			"fill" : "#116"
		});

		this.bar1 = R.rect(72,5,5,120);
		this.bar1.attr(whiteAttr);

		this.bar2 = R.rect(5,65,140,5);
		this.bar2.attr(whiteAttr);

		this.path.push(
			this.windowFrame, 
			this.windowGlass,
			this.bar1, this.bar2
		);
		this.path.attr({
			"transform" : "t100,100"
		});

		for ( var i = 0; i < 15; i++ ) {
			var 
				tx = Math.round(Math.random() * 130),
				ty = Math.round(Math.random() * 130),
				speedX = Math.round( Math.random() ),
				speedY = Math.round( Math.random() * 2 + 1 );

			this.snowPos.push([tx, ty, speedX, speedY]);
			this.snow.push( R.circle(108,103,3).attr({
				"stroke" : "none",
				"fill" : "#f7F7F7",
				"transform" : "t" + tx + "," + ty
			}) );
		}
	};

	this.update = function(){

		for ( var i = 0, max = this.snow.length; i < max; i++ ) {
			var 
				tx = this.snowPos[i][0],
				ty = this.snowPos[i][1],
				speedX = this.snowPos[i][2],
				speedY = this.snowPos[i][3];

			tx += speedX;
			ty += speedY;
			if ( ty > 120 || tx > 138 ) {
				tx = Math.round(Math.random() * 130);
				ty = 0;
				speedX = Math.round( Math.random() );
				speedY = Math.round( Math.random() * 2 + 1 );

				this.snowPos[i][2] = speedX;
				this.snowPos[i][3] = speedY;
			}
			this.snowPos[i][0] = tx;
			this.snowPos[i][1] = ty;

			this.snow[i].attr({
				"transform" : "t" + tx + "," + ty
			});
		}
	};

	this.init(R);
}