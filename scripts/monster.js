define(["jquery", "pixi"],
function ($, PIXI) {

	var spriteResource = {
		'malus' : 'assets/img/pixel_malus.png',
		'bonus' : 'assets/img/pixel_bonus.png'
	};

	function Monster(pMain, pType) {
		this.myMain        = pMain;
		this.typeOfMonster = pType;
	}

	Monster.prototype.init = function (pX, pY) {
		var monsterTexture     = PIXI.Texture.fromImage(spriteResource[this.typeOfMonster]);
		this.sprite            = new PIXI.TilingSprite(monsterTexture, 24, 24);
		this.sprite.position.x = pX;
		this.sprite.position.y = pY;
	}

	Monster.prototype.update = function () {
        //Deplacement du monstre
        this.sprite.position.x -= 3;
	}

	Monster.prototype.onCollision = function () {
        this.myMain.stage.removeChild(this.sprite);
        this.sprite.position.x = -100;
        var index = $.inArray(this, this.myMain.listMonster);
        this.myMain.listMonster.splice(index, 1);
	}


	return Monster;
});