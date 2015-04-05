require.config({
	paths : {
		"jquery" : "../script/ext_libs/jquery-2.1.1.min",
		"pixi" : "../script/ext_libs/pixi.dev.js"
	},
	shim : {
		"jquery" : {
			exports : "$"
		}
	}

/*	urlArgs : "bust=" + (new Date()).getTime()*/
})

require(["main"], function(Main){
	var myMain   = new Main();

	return myMain;
})