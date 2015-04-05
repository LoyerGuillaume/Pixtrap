define(["pixi"],
function (PIXI) {

	function Monster() {

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


	return Monster;
});