define(["pixi"],
function (PIXI) {

	function Player (pMain) {
		this.myMain = pMain;
	}

	Player.prototype.init = function (pX, pY) {
        var myPlayerTexture = PIXI.Texture.fromImage("assets/img/kirby.png");
        this.sprite = new PIXI.TilingSprite(myPlayerTexture, 20, 20);
        this.sprite.position.x  = pX;
        this.sprite.position.y  = pY;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.interactive = true;

	}

	Player.prototype.update = function () {

        //Deplacement du joueur en fonction de la souris
        var diffPosition = {
            x : - this.sprite.position.x + this.myMain.mouseControl.positionMouse.x ,
            y : - this.sprite.position.y + this.myMain.mouseControl.positionMouse.y
        }
        if(this.sprite.position.x <= 200 || this.myMain.mouseControl.positionMouse.x <= 200){
            this.sprite.position.x += diffPosition.x * 0.2;
        }
        this.sprite.position.y += diffPosition.y * 0.2;



        //Collision entre le player et le monstre
        var xP = this.sprite.position.x;
        var yP = this.sprite.position.y;
        var xM = this.myMain.myMonster.sprite.position.x;
        var yM = this.myMain.myMonster.sprite.position.y;
        if(xP + this.sprite.width / 2 >= xM - this.myMain.myMonster.sprite.width / 2 &&
           xP - this.sprite.width / 2 <= xM + this.myMain.myMonster.sprite.width / 2 &&
          yP + this.sprite.height/ 2 >= yM - this.myMain.myMonster.sprite.height/ 2 &&
          yP - this.sprite.height/ 2 <= yM + this.myMain.myMonster.sprite.height/ 2) {
            this.myMain.stage.removeChild(this.myMain.myMonster.sprite);
            this.myMain.myMonster.sprite.position.x = -100;
            this.sprite.scale.x = this.sprite.scale.y += 0.5;
            console.log("CATCH");
        }
	}

	return Player;
});