define(["pixi"],
function (PIXI) {

	function Player (pMain) {
		this.myMain = pMain;
		this.defaultHeight = this.height = 20;
		this.defaultWidth  = this.width = 20;
	}

	Player.prototype.init = function (pX, pY) {
		var myPlayerTexture     = PIXI.Texture.fromImage("assets/img/kirby.png");
		this.sprite             = new PIXI.TilingSprite(myPlayerTexture, this.height, this.width);
		this.sprite.position.x  = pX;
		this.sprite.position.y  = pY;
		this.sprite.anchor.x    = 0.5;
		this.sprite.anchor.y    = 0.5;
		this.sprite.interactive = true;

	}

	Player.prototype.update = function () {

        //Deplacement du joueur en fonction de la souris
        var diffPosition = {
            x : - this.sprite.position.x + this.myMain.mouseControl.positionMouse.x ,
            y : - this.sprite.position.y + this.myMain.mouseControl.positionMouse.y
        }
/*        if(this.sprite.position.x <= 200 || this.myMain.mouseControl.positionMouse.x <= 200){
            this.sprite.position.x += diffPosition.x * 0.2;
        }*/
        this.sprite.position.y += diffPosition.y * 0.2;
	}

	Player.prototype.onCollision = function () {
		this.sprite.scale.x = this.sprite.scale.y += 0.5;
		this.height         += this.defaultHeight * 0.5;
		this.width          += this.defaultWidth * 0.5;
	}

	return Player;
});