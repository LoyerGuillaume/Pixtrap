require.config({
	paths : {
		"jquery" : "../scripts/ext_libs/jquery-2.1.1.min",
		"pixi" : "../scripts/ext_libs/pixi.dev"
	}

/*	urlArgs : "bust=" + (new Date()).getTime()*/
})

require(["main"], function(Main){
	var myMain   = new Main();

	return myMain;
})