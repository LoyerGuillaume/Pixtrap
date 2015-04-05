define(["jquery", "pixi"],
function ($, PIXI) {

	function Main() {
		this.init();
	}

	Main.prototype.init = function () {
		this.initPixi();
	};

	Main.prototype.initPixi = function () {
		this.stage = new PIXI.Stage(0x66FF99);
		this.renderer = new PIXI.autoDetectRenderer(512, 384, {view : document.getElementById("game-canvas")});


        this.renderer.render(this.stage);
	};


	return Main;
});