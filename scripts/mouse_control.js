define(["pixi"],
function (PIXI) {

	function MouseControl(pStage, params) {
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
	}



	return MouseControl;
});