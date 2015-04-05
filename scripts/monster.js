define(["jquery", "pixi"],
function ($, PIXI) {

	function Monster(pMain) {
		this.myMain = pMain;
	}

	Monster.prototype.init = function (pX, pY) {
        var monsterTexture = PIXI.Texture.fromImage("assets/img/monster.png");
        this.sprite = new PIXI.TilingSprite(monsterTexture, 24, 24);
        this.sprite.position.x = pX;
        this.sprite.position.y = pY;
	}

	Monster.prototype.update = function () {
        //Deplacement du monstre
        this.sprite.position.x -= 5;
	}

	Monster.prototype.onCollision = function () {
        this.myMain.stage.removeChild(this.sprite);
        this.sprite.position.x = -100;
        var index = $.inArray(this, this.myMain.listMonster);
        this.myMain.listMonster.splice(index, 1);
	}


	return Monster;
});