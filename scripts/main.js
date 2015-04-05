define(["jquery", "pixi"],
function ($, PIXI) {

	function Main() {
	}

	Main.prototype.init = function () {
		this.initPixi();
	};

	Main.prototype.initPixi = function () {
		stage = new PIXI.Stage(0x66FF99);
		renderer = new PIXI.autoDetectRenderer(1032, 384, {view : document.getElementById("game-canvas")});

        positionMouse = {
            x : 0,
            y : 0
        };


		var farTexture = PIXI.Texture.fromImage("assets/img/bg-far.png");
		farBg = new PIXI.TilingSprite(farTexture, 1032, 256);
		farBg.position.x = 0;
		farBg.position.y = 0;
		farBg.tilePosition.x = 0;
		farBg.tilePosition.y = 0;
		stage.addChild(farBg);

        var midTexture = PIXI.Texture.fromImage("assets/img/bg-mid.png");
        midBd = new PIXI.TilingSprite(midTexture, 1032, 256);
        midBd.position.x = 0;
        midBd.position.y = 128;
        midBd.tilePosition.x = 0;
        midBd.tilePosition.y = 0;
        stage.addChild(midBd);

        var myPlayerTexture = PIXI.Texture.fromImage("assets/img/kirby.png");
        myPlayer = new PIXI.TilingSprite(myPlayerTexture, 20, 20);
        myPlayer.position.x  = 100;
        myPlayer.position.y  = stage.height / 2;
        myPlayer.anchor.x = 0.5;
        myPlayer.anchor.y = 0.5;
        myPlayer.interactive = true;
        myPlayer.mousemove = function (data) {
            positionMouse = data.getLocalPosition(this.parent);
        };
        stage.addChild(myPlayer);

        stage.interactive = true;
        stage.buttonMode = true;
        stage.defaultCursor = "none";

        requestAnimFrame(update);
    };

	var update = function () {
		renderer.render(stage);

        farBg.tilePosition.x -= 0.128;
		midBd.tilePosition.x -= 0.64;


        var diffPosition = {
            x : - myPlayer.position.x + positionMouse.x ,
            y : - myPlayer.position.y + positionMouse.y
        }

        if(myPlayer.position.x <= 200 || positionMouse.x <= 200){
            myPlayer.position.x += diffPosition.x * 0.2;
        }
            myPlayer.position.y += diffPosition.y * 0.2;


		requestAnimFrame(update);
	};


	return Main;
});