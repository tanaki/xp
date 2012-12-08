 
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame || 
          window.oRequestAnimationFrame || 
          window.msRequestAnimationFrame || 
          function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// Create Namespace
var SKI = window.SKI || {
	R : null,
	Frames : 0
};

SKI.init = function() {

	SKI.Stats = new Stats();
	SKI.Stats.domElement.style.position = "absolute";
	SKI.Stats.domElement.style.top = 0;
	document.body.appendChild( SKI.Stats.domElement );

	this.R = Raphael("raphael", 1024, 650);

	// Background
	this.R.image("img/bg.jpg", 0, 0, 1024, 650);

	// Fire
	// this.initBackground();
	this.initFire();

	// Socks
	// this.initSocks();

	// Window + Snow
	this.initWindow();

	// TODO
	// Tree (+ Bowls)

	SKI.update();

	// Video
	SKI.initVideo();
};

SKI.update = function(){

	SKI.Stats.begin();

	SKI.Frames++;

	if ( SKI.Flames && (SKI.Frames % 6) === 0 ) {
		for ( var i = 0, max = SKI.Flames.length; i < max; i++ ) {
			SKI.Flames[i].update();
		}
	}

	if ( SKI.SnowWindow ) {
		SKI.SnowWindow.update();
	}

	SKI.Stats.end();

	window.requestAnimFrame(SKI.update);
};


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

SKI.initVideo = function() {

	SKI.canvas = document.createElement("canvas");
	SKI.ctx = SKI.canvas.getContext("2d");

	SKI.canvas.style.position="absolute";
	SKI.canvas.style.top=0;
	SKI.canvas.style.left=50;

	SKI.userCanvas = document.getElementById("user");
	SKI.ctxUser = SKI.userCanvas.getContext("2d");

	if (hasGetUserMedia()) {

		window.URL = window.URL || window.webkitURL;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

		if (!navigator.getUserMedia) {
			onFailSoHard();
		} else {
			navigator.getUserMedia({video: true}, success, onFailSoHard);
		}

	}
};

function hasGetUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

function success(stream) {
	SKI.video = document.createElement("video");
	SKI.video.autoplay = true;
	SKI.video.src = window.URL.createObjectURL(stream);
	
	setInterval(function(){		

		if ( SKI.canvas && SKI.ctx && SKI.video ) {
			SKI.ctx.drawImage(SKI.video, 0, 0, 200, 150);

			faces = detectFaces();
			if ( faces && faces[0] ) {

				var img = faces[0];
				SKI.ctxUser.drawImage(SKI.canvas,img.x,img.y + 5,img.width,img.height / 2,0,0,50,25);
			}
		}
	}, 1000);
}

function onFailSoHard(e) {
	console.log('FAILED MOTHA UCKA!', e);
}

function detectFaces() {
	return ccv.detect_objects({canvas : (ccv.pre(SKI.canvas)), cascade: cascade, interval: 2, min_neighbors: 1});
}

/*
<div id="jingle-bell" style="position:absolute; left:-5000px;">
			<iframe width="420" height="315" src="http://www.youtube.com/embed/O2MFducncsg?autoplay=1" frameborder="0" allowfullscreen></iframe>
		</div>
		<div id="jingle-death" style="position:absolute; left:-5000px;">
			<iframe width="420" height="315" src="http://www.youtube.com/embed/MntZ2oPDPnM?autoplay=1#t=1m01s" frameborder="0" allowfullscreen></iframe>
		</div>
		*/
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