define(["pixi"],
function (PIXI) {

	function Player (pMain) {
		this.myMain        = pMain;
		this.defaultHeight = this.height = 60;
		this.defaultWidth  = this.width = 60;
		this.defaultScale  = this.scale = 0.25;
		this.scaleUp       = 0.25;
	}

	Player.prototype.init = function (pX, pY) {
		var myPlayerTexture     = PIXI.Texture.fromImage("assets/img/pixel_player.png");
		this.sprite             = new PIXI.TilingSprite(myPlayerTexture, this.height, this.width);
		this.sprite.position.x  = pX;
		this.sprite.position.y  = pY;
		this.sprite.anchor.x    = 0.5;
		this.sprite.anchor.y    = 0.5;
		this.sprite.interactive = true;
		this.sprite.scale.x     = this.sprite.scale.y = this.scale;

	}

	Player.prototype.update = function () {

        //Deplacement du joueur en fonction de la souris
        var diffPosition = {
            x : - this.sprite.position.x + this.myMain.mouseControl.positionMouse.x ,
            y : - this.sprite.position.y + this.myMain.mouseControl.positionMouse.y
        }
//        if(this.sprite.position.x <= 200 || this.myMain.mouseControl.positionMouse.x <= 200){
  //      }
        this.sprite.position.x += diffPosition.x * 0.2;
        this.sprite.position.y += diffPosition.y * 0.2;
	}

	Player.prototype.onCollision = function (pMonster) {
		if (pMonster.typeOfMonster == "malus") {
			this.setDefaultSize();
		} else {
			this.setIncreaseSize();
		}
	}

	Player.prototype.setIncreaseSize = function () {
		this.scale          += this.scaleUp;
		this.sprite.scale.x = this.sprite.scale.y = this.scale;
		this.height         = this.defaultHeight  * this.scale;
		this.width          = this.defaultWidth   * this.scale;
	}

	Player.prototype.setDefaultSize = function () {
		this.scale          = this.defaultScale;
		this.height         = this.defaultHeight;
		this.width          = this.defaultWidth;
		this.sprite.scale.x = this.sprite.scale.y = this.scale;
	}

	return Player;
});