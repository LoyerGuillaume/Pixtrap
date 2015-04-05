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
		this.farBg = new PIXI.TilingSprite(farTexture, 1032, 256);
		this.farBg.position.x = 0;
		this.farBg.position.y = 0;
		this.farBg.tilePosition.x = 0;
		this.farBg.tilePosition.y = 0;
		stage.addChild(this.farBg);

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

        var monsterTexture = PIXI.Texture.fromImage("assets/img/monster.png");
        monster = new PIXI.TilingSprite(monsterTexture, 24, 24);
        monster.position.x = 1000;
        monster.position.y = 50;
        stage.addChild(monster);

        stage.interactive = true;
        stage.buttonMode = true;
        stage.defaultCursor = "none";

        if (this.requestAnimFrame) {
            this.requestAnimFrame.call(window,this.update.bind(this));
        }
    };

    Main.prototype.requestAnimFrame = (
        function(){ 
            return window.requestAnimationFrame
             || window.webkitRequestAnimationFrame
             || window.mozRequestAnimationFrame
             || window.oRequestAnimationFrame
             || window.msRequestAnimationFrame
             || null
        }
     )();

	Main.prototype.update = function () {
		renderer.render(stage);

        // Scrolling du fond
        this.farBg.tilePosition.x -= 0.128;
		midBd.tilePosition.x -= 0.64;


        //Deplacement du joueur en fonction de la souris
        var diffPosition = {
            x : - myPlayer.position.x + positionMouse.x ,
            y : - myPlayer.position.y + positionMouse.y
        }
        if(myPlayer.position.x <= 200 || positionMouse.x <= 200){
            myPlayer.position.x += diffPosition.x * 0.2;
        }
        myPlayer.position.y += diffPosition.y * 0.2;

        //Deplacement du monstre
        monster.position.x -= 5;

        //Collision entre le player et le monstre
        if(myPlayer.position.x + myPlayer.width / 2 >= monster.position.x - monster.width / 2 &&
           myPlayer.position.x - myPlayer.width / 2 <= monster.position.x + monster.width / 2 &&
           myPlayer.position.y + myPlayer.height/ 2 >= monster.position.y - monster.height/ 2 &&
           myPlayer.position.y - myPlayer.height/ 2 <= monster.position.y + monster.height/ 2) {
            stage.removeChild(monster);
            monster.position.x = -100;
            myPlayer.scale.x = myPlayer.scale.y += 0.1;
            console.log("CATCH");
        }



        if (this.requestAnimFrame) {
            this.requestAnimFrame.call(window,this.update.bind(this));
        }
	};


	return Main;
});