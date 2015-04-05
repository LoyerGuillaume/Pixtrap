define(["pixi"],
function (PIXI) {

	function BackgroundScrolling() {

	}

	BackgroundScrolling.prototype.init = function (pStage) {

		var farTexture = PIXI.Texture.fromImage("assets/img/bg_far2.png");
		this.farBg = new PIXI.TilingSprite(farTexture, 1032, 320);
		this.farBg.position.x = 0;
		this.farBg.position.y = 0;
		this.farBg.tilePosition.x = 0;
		this.farBg.tilePosition.y = 0;
		this.farBg.scale.x = this.farBg.scale.y = 1.4;
		pStage.addChild(this.farBg);

        var midTexture = PIXI.Texture.fromImage("assets/img/bg-mid.png");
        this.midBd = new PIXI.TilingSprite(midTexture, 1032, 256);
        this.midBd.position.x = 0;
        this.midBd.position.y = 128;
        this.midBd.tilePosition.x = 0;
        this.midBd.tilePosition.y = 0;
        pStage.addChild(this.midBd);
	}

	BackgroundScrolling.prototype.update = function () {
        // Scrolling du fond
        this.farBg.tilePosition.x -= 0.128;
		this.midBd.tilePosition.x -= 0.64;
	}


	return BackgroundScrolling;
});