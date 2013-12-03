/**
 * Basic math vector representaion
 */
Vector = function(x,y) { 
	this.x = x || 0;
	this.y = y || 0;
}
Vector.prototype.set = function(x,y) { 
	this.x = x;
	this.y = y;
}
Vector.prototype.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
}
Vector.prototype.getMagnitude = function () { 
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vector.prototype.getAngle = function () {
	return Math.atan2(this.y,this.x);
};


/**
 * Bounce Ball 
 */	
BounceBall = function(x, y, r, gameInstance) {
	this.app = gameInstance;
	this.radius = r;
	this.stopped = false;

	this.fillColor = '#F33';
	this.borderColor = '#555';

	this.position = new Vector(x,y);
	this.velocity = new Vector(0,0);
	this.acceleration = new Vector(0,0);

	this.bounceCoef = 0.5;
}

BounceBall.prototype.draw = function() {
	cxt.save();
	cxt.beginPath();
	cxt.arc(this.position.x, this.position.y, this.radius,  rad(0) , rad(360), false );
	cxt.fillStyle = this.borderColor;
	cxt.fill();
	cxt.closePath();
	
	cxt.beginPath();
	cxt.arc(this.position.x, this.position.y, this.radius-1,  rad(0) , rad(360), false );
	cxt.fillStyle = this.fillColor;;
	cxt.fill();
	cxt.closePath();
	
	cxt.restore();
}

BounceBall.prototype.update = function() {

	if (this.app.LEFT_PRESSED && this.app.RIGHT_PRESSED)
		this.app.LEFT_PRESSED = false;

	if (this.app.LEFT_PRESSED || this.app.RIGHT_PRESSED) {
		if (this.app.LEFT_PRESSED) {
			this.velocity.x = (this.app.IN_JUMP) ? -4 : -6;;
		}
		else if (this.app.RIGHT_PRESSED) {
			this.velocity.x = (this.app.IN_JUMP) ? 4 : 6;
		}
	}

	if (this.app.RIGHT_RELEASE) {
		this.app.RIGHT_RELEASE = false;
		//this.acceleration.x = (this.app.IN_JUMP) ? -0.2 : -0.5;
		this.velocity.x = 0;
	}
	
	if (this.app.LEFT_RELEASE) {
		this.app.LEFT_RELEASE = false;
		//this.acceleration.x = (this.app.IN_JUMP) ? 0.2 : 2;
		this.velocity.x = 0;
	}
	
	//Make a jump if button pressed and ball not already in the air
	if (this.app.JUMP_PRESSED && ! this.app.IN_JUMP) {
		this.velocity.y += -10;
		this.acceleration.y = 0.5;
		this.app.IN_JUMP = true;
	}

	if( this.ground && (this.position.x + this.radius < this.ground.x ||
		this.position.x - this.radius > this.ground.x + this.ground.width)
		) {
		this.acceleration.y = 0.5;
		this.app.IN_JUMP = true;	
	}

	
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);

	if (this.app.IN_JUMP && this.velocity.y > 0) { 
		var box;
		for(var i in this.app.objects) {
			box = this.app.objects[i];
			if( box.checkCollision(this) ) {
				this.position.y = box.y - this.radius;
				this.acceleration.y = 0;
				this.velocity.y = 0;
				this.app.IN_JUMP = false;
				this.ground = box;
				break;
			}
		}
	}
	
	
}

Box = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
Box.prototype.draw = function(){
	mCxt.save();
	mCxt.fillStyle = '#555';
	mCxt.fillRect(this.x,this.y,this.width,this.height);
	mCxt.restore();
}

Box.prototype.checkCollision = function(Ball) {

	if(Ball.position.x >= this.x && Ball.position.x <= this.x + this.width) {
		if( Ball.position.y  >= this.y &&
			Ball.position.y <  this.y + this.height
			) {
			return true;
		}
	}			
	return false;
}



