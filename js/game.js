var game = new Phaser.Game(1500, 700, Phaser.CANVAS, 'phaser-example', { preload:preload, create: create, update: update, render: render });

var poly, area, landPoly, graphics, levelSelector, options, gameObject, land, placed, index, rectangle,  finished, score, controls, referenceFB, docRef;
var xKey; // Delete House
var aKey; // Rotate C.Clock
var dKey; // Rotate Clock
var sKey; // Change Type (House)
var qKey; // Create New House
var rKey; // Reflection
var wKey; // Change Current House
var fKey; // Finish level
var pressedX = true;
var pressedQ = true;
var pressedS = true;
var pressedR = true;
var pressedW = true;
var pressedF = true;
var houseOutside = false;
var overButton = false;
var placeRoad = false;
var currentPlaceRoad = false;
var placeHouse = false;
var deleted = 0;
var selectedLevel;
var name = localStorage.getItem("user");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD0UFMgSgr_zDtLXyoeXwrgwLth_UOGbJQ",
    authDomain: "housingdb-d1692.firebaseapp.com",
    databaseURL: "https://housingdb-d1692.firebaseio.com",
    projectId: "housingdb-d1692",
    storageBucket: "housingdb-d1692.appspot.com",
    messagingSenderId: "511373990480",
    appId: "1:511373990480:web:bd3f1e42769188d5f58f55",
    measurementId: "G-KB3JQW4FK0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

function preload(){
	game.load.image('background','assets/background.jpg');
	game.load.spritesheet('houseButton', 'assets/houseButton.jpg ', 196, 73);
	game.load.spritesheet('roadButton', 'assets/roadButton.jpg ', 196, 73);
    game.load.image('controls', 'assets/ControlsLevel.png');
    selectedLevel = document.location.search.replace('?', ''); 
    referenceFB = "user/"+name;
    docRef = firestore.doc(referenceFB);
    docRef.set({
        "Level played": selectedLevel
    })
    referenceFB += "/levels/level"+selectedLevel
    docRef = firestore.doc(referenceFB);
    
    
}


function create() {

	finished = false;
    score = 0;
	placed = [];
    game.stage.backgroundColor = '#182d3b';
    houseButton = game.add.button(520, 500, 'houseButton', clickHouse, this, 1, 0, 0);
    houseButton.events.onInputOver.add(over, this);
    houseButton.events.onInputOut.add(out, this);
    roadButton = game.add.button(770, 500, 'roadButton', clickRoad, this, 1, 0, 0);
    roadButton.events.onInputOver.add(over, this);
    roadButton.events.onInputOut.add(out, this);

    
    
    levelSelector = new LevelSelector(selectedLevel);
	land = levelSelector.getLand();
    landPoly = land.getPolygon();
    landgraphics = game.add.graphics(0, 0);
    landgraphics.beginFill(0x00FF00);
    landgraphics.drawPolygon(landPoly.points);
    landgraphics.endFill();
    area = land.getArea();
    vertices = land.getVertex();
    docRef.set({
        "Area" : area
    })
    docRef.update({
        "Vertices" : vertices
    })

    

    var style = { font: "50px Arial", fill: "#ffffff", align: "center" };
    var text = game.add.text(1050, 50, "Available Models", style);
    var prio1 = game.add.text(890, 270, levelSelector.getPriority1(), style);
    var prio2 = game.add.text(1035, 270, levelSelector.getPriority2(), style);
    var prio3 = game.add.text(1190, 270, levelSelector.getPriority3(), style);
    text.anchor.set(0.5);
    var graphicsRect = game.add.graphics(0, 0);
    graphicsRect.lineStyle(10, 0x0000FF, 1);
    graphicsRect.drawRect(770, 10, 550, 330);

    var house1 = levelSelector.getHouse1();
    var house1Poly = house1.getPolygon();
    var house1Graphics = game.add.graphics(0, 0);
    house1Graphics.beginFill(house1.getColor());
    house1Graphics.drawPolygon(house1Poly.points);
    house1Graphics.endFill();
    area = house1.getArea();
    console.log(area);

    var house2 = levelSelector.getHouse2();
    var house2Poly = house2.getPolygon();
    var house2Graphics = game.add.graphics(0, 0);
    house2Graphics.beginFill(house2.getColor());
    house2Graphics.drawPolygon(house2Poly.points);
    house2Graphics.endFill();

    var house3 = levelSelector.getHouse3();
    var house3Poly = house3.getPolygon();
    var house3Graphics = game.add.graphics(0, 0);
    house3Graphics.beginFill(house3.getColor());
    house3Graphics.drawPolygon(house3Poly.points);
    house3Graphics.endFill();
    

    controls = game.add.sprite(1000, 380, 'controls');
    controls.scale.setTo(0.7, 0.7);
    
    gameObject = levelSelector.getHouse();
    graphics = game.add.graphics(0, 0);
    poly = gameObject.getPolygon();
    placed.push([gameObject, graphics])
    index = 0;
    redrawObject()
    
	xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
	qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
	wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.X, Phaser.Keyboard.Q, Phaser.Keyboard.R, Phaser.Keyboard.W, 
    									Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.F]);
}

function update() {

    graphics.clear();
    if (game.input.mousePointer.isDown){
        pressedS = false;
        pressedX = false;
    	var tmpCenter = gameObject.getCenter();
    	gameObject.setCenter([game.input.x, game.input.y])
    	if(overButton){
    		gameObject.setCenter(tmpCenter)
    	}
    	redrawObject()
    	
    }
    if (aKey.isDown){
        pressedS = false;
        pressedX = false;
    	gameObject.setAngle(1)
    	redrawObject()
    }

    if (dKey.isDown)
    {
        pressedS = false;
        pressedX = false;
    	gameObject.setAngle(-1)
    	redrawObject()
    }
    if (qKey.isDown)
    {
    	if(pressedQ && aKey.isUp && dKey.isUp){
    		var landPolygon = land.getPolygonPoints()
    		var housePolygon;
    		var ray = new RayPolygon(landPolygon)
    		var colision = false
    		for (var i = 0; i<placed.length;i++){
            	var houses = new RayPolygons(placed, placed[i][0], i)
            	if(houses.checkColision()){
            		colision = true;
            	}
            	housePolygon = placed[i][0].getPolygonPoints()
            	if(ray.containsPolygon(housePolygon)){
            		houseOutside = false;
            	}else{
            		houseOutside = true;
            	}
            }
            housePolygon = gameObject.getPolygonPoints()
    		if((ray.containsPolygon(housePolygon) && !colision && !houseOutside)){
    			gameObject.setPlaced(true);
                if(!gameObject.isRoad()){
                    gameObject.setColor( 0xFF3300);
                } else{
                    gameObject.setColor(0x778899);
                }
                var cent = gameObject.getCenter();
                var angle = gameObject.getAngle();
                var area = gameObject.getArea();
                var reflection = gameObject.getReflection();
                var obj = levelSelector.getCurrentObject();
                var tmpRef = referenceFB +"/objects/object" + index;
                docRef = firestore.doc(tmpRef);
                var pos = "(" + cent[0] + ", " +  cent[1] + ")"
                docRef.set({
                    "Type": obj
                })
                docRef.update({
                    "Position": pos
                })
                docRef.update({
                    "Angle": angle
                })
                docRef.update({
                    "Reflection": reflection
                })
                docRef.update({
                    "Area": area
                })
                if(currentPlaceRoad){
                    gameObject = levelSelector.getRoad();
                } else {
                    gameObject = levelSelector.getHouse();
                }
                graphics = game.add.graphics(0, 0);
                placed.push([gameObject, graphics])
                poly = placed[index][0].getPolygon();
                redrawPlacedObjects()
                index += 1; 
                docRef = firestore.doc(referenceFB);
                
			}
			pressedQ = false;
			
    	}
    }
    if(qKey.isUp){
    	pressedQ = true;
    }

    if (xKey.isDown){
    	if(pressedX && index<placed.length-1){
            var tmpRef = referenceFB +"/deleted/object" + deleted;
            deleted ++;
            var cent = gameObject.getCenter();
            var angle = gameObject.getAngle();
            var area = gameObject.getArea();
            var reflection = gameObject.getReflection();
            var obj = levelSelector.getCurrentObject();
            docRef = firestore.doc(tmpRef);
            var pos = "(" + cent[0] + ", " +  cent[1] + ")"
            docRef.set({
                "Type": obj
            })
            docRef.update({
                "Position": pos
            })
            docRef.update({
                "Angle": angle
            })
            docRef.update({
                "Reflection": reflection
            })
            docRef.update({
                "Area": area
            })
            docRef = firestore.doc(referenceFB);
    		placed.splice(index, 1) 
    		var tmp = placed[index]
    		gameObject = tmp[0];
    		graphics = tmp[1];
    		poly = placed[index][0].getPolygon();
    		redrawPlacedObjects()
			redrawObject()
			pressedX = false;
			
    	}
    }
    
    if(xKey.isUp){
    	pressedX = true;
    }

    if (sKey.isDown){
    	if(pressedS){
            currentPlaceRoad = false;
    		levelSelector.changeHouse();
    		gameObject = levelSelector.getHouse();
    		graphics = game.add.graphics(0, 0);
    		placed[index][0] = gameObject;
			placed[index][1] = graphics;
    		redrawPlacedObjects()
			redrawObject()
			pressedS = false;
			
    	}
    }
    
    if(sKey.isUp){
        pressedS = true;
    }
    if (placeHouse){
		gameObject = levelSelector.getHouse();
		graphics = game.add.graphics(0, 0);
		placed[index][0] = gameObject;
		placed[index][1] = graphics;
		redrawPlacedObjects()
		redrawObject()
		placeHouse = false;
        currentPlaceRoad = false;
    }

    if (placeRoad){
		gameObject = levelSelector.getRoad();
		graphics = game.add.graphics(0, 0);
		placed[index][0] = gameObject;
		placed[index][1] = graphics;
		redrawPlacedObjects()
		redrawObject()
		placeRoad = false;
        currentPlaceRoad = true;
    }

    
    

    if (rKey.isDown){
    	if(pressedR){
    		gameObject.reflectPolygon();
    		redrawObject()
    		pressedR = false;
    	}
			
    }
    if(rKey.isUp){
    	pressedR = true;
    }


    if (wKey.isDown){
        //  If the shift key is also pressed then the world is rotated
        if (pressedW){
        	var landPolygon = land.getPolygonPoints()
    		var housePolygon = gameObject.getPolygonPoints()
    		var ray = new RayPolygon(landPolygon)
    		var colision = false
    		if(ray.containsPolygon(housePolygon)|| !gameObject.getPlaced()){
				index +=1;
				
    			if(index>placed.length-1){
	    			index = 0
    			}
    			if(!gameObject.isRoad()){
                    gameObject.setColor( 0xFF3300);
                } else{
                    gameObject.setColor(0x778899);
                }
    			var tmp = placed[index]
                tmp[0].initialColor();
    			gameObject = tmp[0];
    			graphics = tmp[1];
    			redrawPlacedObjects()
				redrawObject()

    		}
    		pressedW = false;
        }
    }
    if(wKey.isUp){
    	pressedW = true;
    }
    if (fKey.isDown){
     	if(pressedF){
            var amountHouses = 0;
            var amountRoads = 0;
            score = 0;
            var totalArea = land.getArea();
            var passed = true;
            for (var i = 0; i<placed.length;i++){
                if(!placed[i][0].isRoad()){
                    amountHouses += 1;
                    placed[i][0].setRoadColision(false);

                }else{
                    amountRoads +=1;
                }
                var objects = new RayPolygons(placed, placed[i][0], i)
                objects.checkRoadColision()
                
            }
            for (var i = 0; i<placed.length -1;i++){
                if(placed[i][0].isRoad()){

                    if(placed[i][0].getRoadColision() - amountHouses + 1==0){
                        placed[i][0].setColor(0x778899);
                    }else if(placed[i][0].getRoadColision()>=2){
                            placed[i][0].setColor(0x778899);
                    }else{
                        placed[i][0].setColor(0x0000FF);
                        passed = false;
                    }

                    placed[i][0].resetRoadColision();
                }else{
                    totalArea -= gameObject.getArea()
                    if(!placed[i][0].isRoadColision() && placed[i][0].getPlaced()){
                        placed[i][0].setColor(0x0000FF)
                        passed = false
                    }else{
                        placed[i][0].setColor(0xFF0000)
                    }
                    score += placed[i][0].getScore();     
                    placed[i][0].setRoadColision(false);
                }
            }
            gameObject.initialColor();
            redrawPlacedObjects();
            if(!passed || amountRoads < amountHouses - 1){
                score = 0;
            }
            var last = index - 1;
            docRef.update({
                    "Score": score
            })
            docRef.update({
                    "Last": last
            })
            amountHouses -= 1;
            docRef.update({
                    "Houses": amountHouses
            })
            docRef.update({
                    "Roads": amountRoads
            })
            docRef.update({
                    "FreeA": totalArea
            })
    		pressedF = false;
        }
    }
    if(fKey.isUp){
    	pressedF = true;
    }


    if (poly.contains(game.input.x, game.input.y))
    {
        graphics.beginFill(gameObject.getColor());
        graphics.drawPolygon(poly.points);
    	graphics.endFill();

    }else{
        graphics.beginFill(gameObject.getColor());
        graphics.drawPolygon(poly.points);
    	graphics.endFill();
    }

}

function redrawObject(){
	poly = gameObject.getPolygon();
	graphics.beginFill(gameObject.getColor());
    graphics.drawPolygon(poly.points);
    graphics.endFill();

}

function redrawPlacedObjects(){
	for (var i = 0; i < placed.length; i++){	
		poly = placed[i][0].getPolygon();
		placed[i][1].beginFill(placed[i][0].getColor());
		placed[i][1].drawPolygon(poly.points);
		placed[i][1].endFill();
	}

}


function render() {

    //game.debug.text(game.input.x + ' x ' + game.input.y, 32, 32);
    game.debug.text("Score: " + score, 30, 550,"#ffffff", "40px Arial")
    game.debug.text("Controls", 1100, 375,"#ffffff", "20px Arial")

}

function clickHouse(){
	placeHouse = true;
}

function clickRoad () {
    placeRoad = true; 
	
}

function over(){
	overButton = true;
}

function out(){
	overButton = false;
}

function load() { 
    var button1 = document.getElementById("Return"); 
    var button2 = document.getElementById("Finish"); 
    button1.addEventListener("click", function(){
        localStorage.setItem("user", name)
        window.document.location = './selector.html' + '?' + 0;
    }, false); 
    button2.addEventListener("click", function(){
        if(score > 3000){
            localStorage.setItem("user", name)
            window.document.location = './congratulations.html';
        }else{
            score = "The score very low."
        }
    }, false); 
} 
