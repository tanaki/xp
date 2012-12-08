SKI.Song = {

	swapSongs : function() {
		
		var 
			jBells = document.getElementById("jinglebells"),
			jDeath = document.getElementById("jingledeath");

		jBells.pause();
		jDeath.play();
	}
};