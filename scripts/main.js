define(["jquery", "pixi", "background_scrolling", "player", "mouse_control", "Monster"],
function ($, PIXI, BackgroundScrolling, Player, MouseControl, Monster) {

	function Main() {
        this.listMonster = [];
	}

	Main.prototype.init = function () {
		this.initPixi();

        this.mouseControl = new MouseControl(this, this.stage, {defaultPositionMouse : {x : 100 , y : this.stage.height / 2}});

        this.backgroundScrolling = new BackgroundScrolling();
        this.backgroundScrolling.init(this.stage);

        this.myPlayer = new Player(this);
        this.myPlayer.init(100, this.stage.height / 2);
        this.stage.addChild(this.myPlayer.sprite);


        this.createMonsters(10);

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

        for (var i = 0; i < this.listMonster.length; i++) {
            this.listMonster[i].update();
        };

        this.getCollision();

        if (this.requestAnimFrame) {
            this.requestAnimFrame.call(window,this.update.bind(this));
        }
	};

    Main.prototype.createMonsters = function (pNbrMonster) {
        for (var i = 0; i < pNbrMonster; i++) {
            var monster = new Monster(this, Math.round(Math.random() * 2) == 0 ? 'malus' : 'bonus');
            monster.init(Math.round(Math.random() * 1000 + 300), Math.round(Math.random() * 500) );
            this.stage.addChild(monster.sprite);
            this.listMonster.push(monster);
        };
    }

    Main.prototype.getCollision = function () {
        var pX      = this.myPlayer.sprite.position.x;
        var pY      = this.myPlayer.sprite.position.y;
        var pWidth  = this.myPlayer.width;
        var pHeight = this.myPlayer.height;

        for (var i = 0; i < this.listMonster.length; i++) {
            var aMonster = this.listMonster[i];
            var mX = aMonster.sprite.position.x;
            var mY = aMonster.sprite.position.y;
            var mWidth = aMonster.sprite.width;
            var mHeight = aMonster.sprite.height;

            if(isCollision(pX, pY, pWidth, pHeight, mX, mY, mWidth, mHeight)) {

                /*this.debugHitBox();*/
                aMonster.onCollision();
                this.myPlayer.onCollision(aMonster);
            }
        }
    }

    var isCollision = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        return (x1 + w1 / 2 >= x2 - w2 / 2 &&
                x1 - w1 / 2 <= x2 + w2 / 2 &&
                y1 + h1 / 2 >= y2 - h2 / 2 &&
                y1 - h1 / 2 <= y2 + h2 / 2);
    }

    Main.prototype.debugHitBox = function() {
        // create a new graphics object
        var graphics = new PIXI.Graphics();

        // begin a green fill..
        graphics.beginFill(0x00FF00);

        // draw a triangle using lines
        graphics.moveTo(this.myPlayer.sprite.x,this.myPlayer.sprite.y);
        graphics.lineTo(this.myPlayer.sprite.x - this.myPlayer.width / 2,this.myPlayer.sprite.y - this.myPlayer.height / 2);
        graphics.lineTo(this.myPlayer.sprite.x + this.myPlayer.width / 2,this.myPlayer.sprite.y - this.myPlayer.height / 2);
        graphics.lineTo(this.myPlayer.sprite.x + this.myPlayer.width / 2,this.myPlayer.sprite.y + this.myPlayer.height / 2);
        graphics.lineTo(this.myPlayer.sprite.x - this.myPlayer.width / 2,this.myPlayer.sprite.y + this.myPlayer.height / 2);
        graphics.lineTo(this.myPlayer.sprite.x - this.myPlayer.width / 2,this.myPlayer.sprite.y - this.myPlayer.height / 2);

        // end the fill
        graphics.endFill();

        // add it the stage so we see it on our screens..
        this.stage.addChild(graphics);
    }


	return Main;
});