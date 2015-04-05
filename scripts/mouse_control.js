define(["pixi"],
function (PIXI) {

	function MouseControl(pMain, pStage, params) {
		this.myMain = pMain;
		params = params || {};
		this.myStage = pStage;
		this.positionMouse =  {
			x : 0,
			y : 0
		};
		this.eventListenerMouse();
	}

	MouseControl.prototype.eventListenerMouse = function () {
		var _this = this;
		this.myStage.mousemove = function (data) {
            _this.positionMouse = data.getLocalPosition(this);
        };

        this.myStage.mouseup = function (data) {
        	_this.myMain.myPlayer.setDefaultSize();
        }
	}



	return MouseControl;
});