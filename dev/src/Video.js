
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

	SKI.displayMessage();

	SKI.video = document.createElement("video");
	SKI.video.autoplay = true;
	SKI.video.src = window.URL.createObjectURL(stream);
	
	var itv = setInterval(function(){		

		if ( SKI.canvas && SKI.ctx && SKI.video ) {
			SKI.ctx.drawImage(SKI.video, 0, 0, 200, 150);

			faces = detectFaces();
			console.log( faces && faces[0] ? faces[0].width : "=" );
			if ( faces && faces[0] && faces[0].width > 80 ) {

				stream.stop();
				SKI.hideMessage();
				SKI.Song.swapSongs();
				clearInterval(itv);
				clearVideo();
			}
		}
	}, 200);
}

function clearVideo() {
	SKI.video.pause();
	SKI.video = null;
	SKI.canvas = null;
	SKI.ctx = null;
}

function onFailSoHard(e) {
	console.log('FAILED MOTHA UCKA!', e);
}

function detectFaces() {
	return ccv.detect_objects({canvas : (ccv.pre(SKI.canvas)), cascade: cascade, interval: 2, min_neighbors: 1});
}
