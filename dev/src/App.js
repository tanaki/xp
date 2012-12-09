 
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

	// Stats... obviously
	this.Stats = new Stats();
	this.Stats.domElement.style.position = "absolute";
	this.Stats.domElement.style.top = 0;
	document.body.appendChild( this.Stats.domElement );

	this.R = Raphael("raphael", 1024, 650);

	// Background
	this.R.image("img/bg.jpg", 0, 0, 1024, 650);

	// Fire
	// this.initBackground();
	this.initFire();

	// TODO Finish Socks
	this.initSocks();

	// Window + Snow
	this.initWindow();

	// TODO
	// Tree (+ Bowls) + guirlande
	this.initTree();

	// Video
	// this.initVideo();

	// And GO !!
	this.update();
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

SKI.displayMessage = function(){
	document.getElementById("message").className = "";
};

SKI.hideMessage = function(){
	document.getElementById("message").className = "hidden";
};

SKI.goCrazy = function(){
	SKI.hideMessage();
	// SKI.Song.swapSongs();

	// TODO
	// Make the fire explode
	// Tree fell then is set on fire
	// socks rotating around the deer with red eyes

};