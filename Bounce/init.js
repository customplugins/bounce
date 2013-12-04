
window.addEventListener('load', function() {
	window.theCanvas = $("canvas");
	theCanvas.width = 500;
	theCanvas.height = 300;
	window.cxt = theCanvas.getContext("2d");

	window.mapCanvas = $("mapCanvas");
	mapCanvas.width = 500;
	mapCanvas.height = 300;
	window.mCxt = mapCanvas.getContext("2d");

	window.Bounce = new BounceGame();
}, false);

//GLOBALS
var RIGHT_PRESSED = false,
	RIGHT_RELEASE = false,
	LEFT_PRESSED  = false,
	LEFT_RELEASE  = false,
	JUMP_PRESSED  = false;

function BounceGame() {	
	var _this = this;

	/**
	 * Level Objects
	 */
	this.objects = [];

	this.animate = function() {
		this.update();
		this.draw();
		setTimeout(function() {
			_this.animate();
		},1000/60)
	}

	this.update = function() {
		this.ball.update();
	}

	this.draw = function() {
		this.clearCanvas();
		this.ball.draw();
	}

	this.clearCanvas = function() {
		cxt.save();
		cxt.clearRect(0,0,theCanvas.width, theCanvas.height)
		cxt.restore();
	}

	this.initLevelObjects = function() {
		this.objects = [
			new Box(320,230,80,60),
			new Box(320,100,80,20),
			new Box(440,170,20,120),
			new Box(20,250,40,40),
			new Box(0,290,500,10)
		];
	}

	this.drawLevel = function() {
		mCxt.clearRect(0, 0, theCanvas.width, theCanvas.height);
		for (var i in this.objects) {
			this.objects[i].draw();
		}
	}

	//Initialize game
	window.addEventListener('keydown',function(e) {
		switch( e.keyCode ) {
			case 39: //RIGHT
				RIGHT_PRESSED = true;
				RIGHT_RELEASE = false;
				break;
			case 37: //LEFT
				LEFT_PRESSED = true;
				LEFT_RELEASE = false;
				break;
			case 38: //SPACE | Jump
				JUMP_PRESSED = true;
				break;
				
		}
	});
	
	window.addEventListener('keyup',function(e) {
		switch( e.keyCode ) {
			case 39: //RIGHT
				RIGHT_PRESSED = false;
				RIGHT_RELEASE = true;
				break;
			case 37: //LEFT
				LEFT_PRESSED = false;
				LEFT_RELEASE = true;
				break;
			case 38: //UP | Jump
				JUMP_PRESSED = false;
				break;
		}
	});

	this.initLevelObjects();
	this.drawLevel();

	this.ball = new BounceBall(125,218,12,this);
	this.ball.inJump = true;
	this.ball.acceleration.y = 0.5;

	this.animate();
	
}