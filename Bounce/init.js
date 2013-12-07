
window.addEventListener('load', function() {
	window.Bounce = new BounceGame();
	Bounce.init();
}, false);

//GLOBALS
var RIGHT_PRESSED = false,
	RIGHT_RELEASE = false,
	LEFT_PRESSED  = false,
	LEFT_RELEASE  = false,
	JUMP_PRESSED  = false;

function BounceGame() {	
	var _this = this;

	this.width = 800;
	this.height = 300;

	/**
	 * Level Objects
	 */
	this.objects = [];

	this.animate = function() {
		_this.update();
		_this.draw();
		requestAnimationFrame(window.Bounce.animate)
	}

	this.update = function() {
		this.ball.update(); 

		//Update Viewport
		this.updateViewport();
	}

	this.updateViewport = function() {
		var offset = 250 - this.ball.position.x;
		if(offset > 0 )
			offset = 0;

		if(offset < -800)
			offset = -800;

		$('level').style.marginLeft = offset + 'px';
	}

	this.draw = function() {
		this.clearCanvas();
		this.ball.draw();
	}

	this.clearCanvas = function() {
		cxt.clearRect(0, 0, this.width, this.height);
	}

	this.initLevelObjects = function() {
		this.objects = [
			new Box(320,230,80,60),
			new Box(320,110,80,20),
			new Box(230,70,80,20),
			new Box(360,50,180,20),
			
			new Box(520,70,20,100),

			new Box(440,170,100,20),

			new Box(440,190,20,70),
			//	new Box(530,220,140,20),
			
			new Box(0,0,800,10,true),
			new Box(0,290,800,10,true),
			new Box(0,10,10,280,true),
			new Box(790,10,10,280,true),
		];
	}

	this.drawLevel = function() {
		mCxt.clearRect(0, 0, this.width, this.height);
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

	this.init = function() {
		var theCanvas = $("canvas");
		theCanvas.width = 800;
		theCanvas.height = 300;
		window.cxt = theCanvas.getContext("2d");

		var mapCanvas = $("mapCanvas");
		mapCanvas.width = 800;
		mapCanvas.height = 300;
		window.mCxt = mapCanvas.getContext("2d");

		this.initLevelObjects();
		this.drawLevel();

		this.ball = new BounceBall(125,218,12,this);

		this.animate();		
	}
}