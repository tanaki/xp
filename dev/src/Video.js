
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