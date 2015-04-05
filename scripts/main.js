define(["jquery", "pixi", "background_scrolling", "player", "mouse_control", "Monster"],
function ($, PIXI, BackgroundScrolling, Player, MouseControl, Monster) {

	function Main() {
	}

	Main.prototype.init = function () {
		this.initPixi();

        this.mouseControl = new MouseControl(this.stage, {defaultPositionMouse : {x : 100 , y : this.stage.height / 2}});

        this.backgroundScrolling = new BackgroundScrolling();
        this.backgroundScrolling.init(this.stage);

        this.myPlayer = new Player(this);
        this.myPlayer.init(100, this.stage.height / 2);
        this.stage.addChild(this.myPlayer.sprite);

        this.myMonster = new Monster();
        this.myMonster.init(1000, 50);
        this.stage.addChild(this.myMonster.sprite);

        if (this.requestAnimFrame) {
            this.requestAnimFrame.call(window,this.update.bind(this));
        }
	};

	Main.prototype.initPixi = function () {
		this.stage = new PIXI.Stage(0x66FF99);
		this.renderer = new PIXI.autoDetectRenderer(1032, 384, {view : document.getElementById("game-canvas")});


        this.stage.interactive = true;
        this.stage.buttonMode = true;
        this.stage.defaultCursor = "none";

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
		this.renderer.render(this.stage);

        this.backgroundScrolling.update();
        this.myPlayer.update();
        this.myMonster.update();

        if (this.requestAnimFrame) {
            this.requestAnimFrame.call(window,this.update.bind(this));
        }
	};


	return Main;
});