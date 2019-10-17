
class Land{
	center = [];
	amount = 0;
	coordinates=[];
	angle = 0;
	points = [];
	area = 0;
	constructor(coordinates){
		this.center = [300, 300];
    	this.coordinates = coordinates;
    	this.amount = Math.trunc(this.coordinates.length/2);
    	this.setPoints();
    	this.setArea();
    	//[50, 50, 150, 50, 200, 100, 150, 150, 100, 100, 50, 150]
	    //this.drawHouse(poly);
		//graphics.destroy();
	}

	setArea(){
		var length = 0; 
		var height = 0;
		var max = 0;
		var min = 99999;
		var cPoint; 
		var x = 0;
		for (var i = 0; i < this.amount; i++){
			cPoint = this.center[0] + this.coordinates[x];
			if(cPoint > max){
				max = cPoint;
			}
			if(cPoint < min){
				min = cPoint;
			}
			x += 2;
		}
		length = max - min;
		max = 0;
		min = 99999;
		var y = 1;
		for (var i = 0; i < this.amount; i++){
			cPoint = this.center[0] + this.coordinates[y];
			if(cPoint > max){
				max = cPoint;
			}
			if(cPoint < min){
				min = cPoint;
			}
			y+=2;
		}
		height = max - min;
		this.area = height * length;
	}

	getArea (){
		return this.area;
	}

	getVertex(){
		return this.points.length/2;
	}
	setPoints(){
		this.points = []
		var x= 0;
		for (var i = 0; i < this.amount; i++){
			this.points.push(Math.trunc(this.center[0] + this.coordinates[x]))
			x += 2;
		}
		var y = 1;
		for (var i = 0; i < this.amount; i++){
			this.points.splice(y, 0, Math.trunc(this.center[1] + this.coordinates[y]));
			y+=2;
		}
	}
	getPolygon(){
		var polyPoints = []
		var x = 0;
		var y = 1;
		for (var i = 0; i < this.amount; i++){
			polyPoints.push(new Phaser.Point(this.points[x], this.points[y]))
			y += 2;
			x+=2;
		}
		var polygon = new Phaser.Polygon(polyPoints);
		return polygon
	}

	getPolygonPoints(){
		var pnts = []
		var j = 0
		for (var i = 0; i < this.amount; i++){ 
			var p = new Point(this.points[j], this.points[j+1])
			pnts.push(p)
			j += 2
		}
		return pnts
	}
}
class House extends Land{
	center = [];
	amount = 0;
	coordinates=[];
	angle = 270;
	points = [];
	placed = false;
	color =0xFF33ff;
	roadColision = false;
	score =1000;
	reflection = false;
	priority = 1;
	constructor(coordinates, priority){
		super(coordinates)
		this.center = [600, 300];
    	this.coordinates = coordinates;
    	this.amount = Math.trunc(this.coordinates.length/2);
    	this.setPoints();
    	this.setAngle(0);
    	this.priority = priority
    	this.initialColor()
    	//[50, 50, 150, 50, 200, 100, 150, 150, 100, 100, 50, 150]
	    //this.drawHouse(poly);
		//graphics.destroy();
	}

	initialColor(){
		if(this.priority == 1){
			this.color = 0xFF33ff
		} else if(this.priority == 2){
			this.color = 0xFF0088
		}else{
			this.color = 0x880055
		}
	}

	getCenter(){
		return this.center
	}

	setCenter(center){
		this.center = center;
		this.setAngle(0);
	}

	setColor(color){
		this.color = color
	}

	getAngle(){
		return this.angle;
	}

	getReflection(){
		return this.reflection
	}

	reflectPolygon(){
		var y = 1;
		for (var i = 0; i < this.amount; i++){
			this.coordinates[y] = -this.coordinates[y];
			y+=2;
		}
		this.setAngle(0)
		this.reflection = !this.reflection;
	}

	setPlaced(placed){
		this.placed = placed;
	}

	getScore(){
		return this.score * this.priority;
	}

	getColor(){
		return this.color;
	}

	getPlaced(){
		return this.placed;
	}

	getCenter(){
		return this.center
	}

	radians(degrees){
		var pi = Math.PI;
		return degrees * (pi/180);
	}

	incrementSize(){
		return 0;
	}

	decrementSize(){
		return 0;
	}

	setAngle(amount){
		var pnts = []
		var x = 0
		var y = 1
		var newCoordinateX;
		var newCoordinateY;
		var pi = Math.PI;
		this.angle += amount;
		if (this.angle > 360){
			this.angle = 0;
		}
		if (this.angle < 0){
			this.angle = 360;
		}
		for (var i = 0; i < this.amount; i++){
			var c = Math.sqrt(this.coordinates[x]**2 + this.coordinates[y]**2)
			if(this.coordinates[x] != 0 && this.coordinates[y] != 0){
				var newAngle = this.angle + Math.atan(this.coordinates[y]/this.coordinates[x]) * 180 / pi;
				if (this.coordinates[x] < 0){
  						newAngle -= 180
  				}
				newCoordinateX = c*Math.cos(this.radians(newAngle))
				newCoordinateY = c*Math.sin(this.radians(newAngle))
			}else{
				newCoordinateX = c*Math.cos(this.radians(this.angle))
				newCoordinateY = c*Math.sin(this.radians(this.angle))
			}
			this.points[x] = Math.trunc(this.center[0] + newCoordinateY)
			this.points[y] = Math.trunc(this.center[1] + newCoordinateX)
			x += 2
			y += 2
		}
	}
	incrementSize(){
		return;
	}

	decrementSize(){
		return;
	}


	isRoad(){
		return false;
	}
	setRoadColision(colision){
		this.roadColision = colision;
	}

	isRoadColision(){
		return this.roadColision;
	}
}

class Road extends House{
	color = 0x778899;
	roadColision = 0;
	constructor(){
		var coordinates = [-15, -30, 15, -30, 15, 30, -15, 30];
		var priority = 1
		super(coordinates, priority);
		this.initialColor()

	}

	addRoadColision(){
		this.roadColision += 1;
	}

	getRoadColision(){
		return this.roadColision;
	}

	resetRoadColision(){
		this.roadColision = 0;
	}

	isRoadColision(){
		return false;
	}

	isRoad(){
		return true;
	}

	getCenterPoint(){
		return new Phaser.Point(this.center[0], this.center[1])
	}

	incrementSize(){
		this.coordinates[5] += 2;
		this.coordinates[7] += 2;
		if(this.coordinates[5] > 100){
			this.coordinates[5] = 100;
			this.coordinates[7] = 100;
		}
		this.setAngle(0);
	}

	decrementSize(){
		this.coordinates[5] -= 2;
		this.coordinates[7] -= 2;
		if(this.coordinates[5] < 30){
			this.coordinates[5] = 30;
			this.coordinates[7] = 30;
		}
		this.setAngle(0);
	}
}

