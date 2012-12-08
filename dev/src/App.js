 
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
	this.initSocks();

	// Window + Snow
	this.initWindow();

	// TODO
	// Tree (+ Bowls)
	// Cerf ?

	// setInterval(SKI.update, 100);
	SKI.update();
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
