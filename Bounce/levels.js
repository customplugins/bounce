
function getLevelObjects(app) {

	var objects = [
			//TODO Level bounds can be calculated dynamically
			new Box(0,15,15,570), //vertical left
			new Box(app.width-15,15,15,570), //vertical right
			new Box(0,0,app.width,15), //top
			new Box(0,585,app.width,15),//bottom

			new Box(0,285,app.width-100,15),//1st


			new Box(135,15,180,180),
			
			new Box(405,105,60,180),
			
			new Box(585,15,120,180),

			new Box(795,135,180,30,{'bl': true}),
			new Box(795,165,60,120),
			
			new Box(1065,135,150,30),
			new Box(1095,165,90,30),
			new Box(1125,15,30,30),

			new Box(1305,135,150,30,{'br': true}),
			new Box(1395,165,60,120),

		];

	return objects;
}