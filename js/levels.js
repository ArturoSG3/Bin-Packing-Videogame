
class LevelSelector{
	houseSelector;
	landSelector;
	roadSelector;
	currentObject;
	constructor(level){
		this.houseSelector = new HouseSelector(level);
		this.landSelector = new LandSelector(level);
		this.roadSelector = new roadSelector();
		this.currentObject = this.houseSelector.getHouseModel();
	}

	getLand(){
		return this.landSelector.getLand();
	}

	getHouse(){
		this.currentObject = this.houseSelector.getHouseModel();
		return this.houseSelector.getHouse();
	}

	getHouse1(){
		return this.houseSelector.getHouse1();
	}

	getPriority1(){
		return this.houseSelector.getPriority1();
	}

	getHouse2(){
		return this.houseSelector.getHouse2();
	}

	getPriority2(){
		return this.houseSelector.getPriority2();
	}


	getHouse3(){
		return this.houseSelector.getHouse3();
	}

	getPriority3(){
		return this.houseSelector.getPriority3();
	}

	getRoad(){
		this.currentObject = "R";
		return this.roadSelector.getRoad();
	}


	getCurrentObject(){
		return this.currentObject;
	}

	changeHouse(road){
		this.houseSelector.changeHouse();
	}

}
class HouseSelector{
	house01 = [-50, -50, 50, -50, 100, 0, 50, 50, 0, 0, -50, 50]; //Square&Triangle
	house02 = [-50, -50, 20, -50, 20, 20, -15, 80, -50, 20]; //Pent Modified
	house03 = [-50, -50, -10, -100, 20, -50, 20, 20, -10, 80, -50, 20]; //Big Hex
	house04 = [-50, -50, 50, -50, 1,50] //Triangle
	house05 = [-50, -50, 50, -50, 50, 50, -50, 50] //Square
	house06 = [-50, -50, 50, -50, 50, 1, 1, 50, -50, 1] //Pent
	house07 = [-25, -50, 25, -50, 50, 1, 25, 50, -25, 50, -50, 1] //Hex
	house08 = [-25, -50, 25, -50, 50, -25, 50, 25, 1, 50, -50, 25, -50, -25] //Hept
	house09 = [-25, -50, 25, -50, 50, -25, 50, 25, 25, 50, -25, 50, -50, 25, -50, -25]//Oct
	priorities = [[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[2,1,3],[1,1,1],[2,3,1],[1,2,2],[1,1,1],[1,1,1],[1,2,2]];
	currentPriorities = [];
	houses = [];
	currentLevel = [];
	currentHouse;
	currentIndex = 0;
	constructor(level){
		this.houses = [[this.house04, this.house05, this.house06],
					   [this.house04, this.house07, this.house06], 
					   [this.house07, this.house08, this.house09], 
					   [this.house04, this.house05, this.house06],
					   [this.house01, this.house02, this.house03],
					   [this.house01, this.house02, this.house03],
					   [this.house04, this.house07, this.house05],
					   [this.house04, this.house07, this.house05],
					   [this.house05, this.house04, this.house06],
					   [this.house04, this.house06, this.house07], 
					   [this.house04, this.house05, this.house08],
					   [this.house05, this.house06, this.house09]
					  ]
		this.currentLevel = this.houses[level];
		this.currentHouse = this.currentLevel[this.currentIndex];
		this.currentPriorities = this.priorities[level]
	}
	getHouse1(){
		var opt1 = new House(this.currentLevel[0], 1)
		opt1.setCenter([900, 200])
		opt1.setColor(0xFFFF00)
		return opt1
	}

	getPriority1(){
		return this.currentPriorities[0]
	}

	getHouse2(){
		var opt2 = new House(this.currentLevel[1], 1)
		opt2.setCenter([1050, 200])
		opt2.setColor(0x00FFFF)
		return opt2
	}

	getPriority2(){
		return this.currentPriorities[1]
	}

	getHouse3(){
		var opt3 = new House(this.currentLevel[2], 1)
		opt3.setCenter([1200, 200])
		opt3.setColor(0xAA00FF)
		return opt3
	}

	getPriority3(){
		return this.currentPriorities[2]
	}

	getHouse(){
		return new House(this.currentHouse, this.currentPriorities[this.currentIndex]);
	}

	getHouseModel(){
		return this.currentIndex + 1;
	}

	changeHouse(){
		this.currentIndex += 1;
		if(this.currentIndex == this.currentLevel.length){
			this.currentIndex = 0;
		}
		this.currentHouse = this.currentLevel[this.currentIndex];
	}
}

class roadSelector{
	constructor(){
		return;
	}

	getRoad(){
		return new Road();
	}
}

class LandSelector{
	land0 = [-200, -200, 200, -200, 200, 200, -200, 200];
	land1 = [-200, -200, 200, -200, 100, 200, -100, 200];
	land2 = [-200, -200, 200, -200, 200, 200, 0, 0, -200, 200];
	land3 = [-200, -200, 100, -200, 100, -100, 200, -100, 200, 200, 50, 200, 50, 100, -50, 100, -50, 200 ,-200,200];
	land4 = [-200, -200, -120, -200, -120, -100, -40, -100, 
			  -40, -200, 40, - 200, 40, -100, 120, -100, 
			  120, -200, 200, -200, 200, 200,
			  120, 200, 120, 100, 40, 100, 40, 200, -40, 200, -40, 100, -120, 100, -120, 200, -200, 200];
	land5 = [-200, -200, -50, -100, 200, -100, 200, 100, -50, 100, -200, 200];
	land6 = [-200, -200, -100, -200, -100, -100, -50, -100, -50,-200, 200, -200, 200, 200, -50, 200, -50, 100, -100, 100, -100, 200, -200, 200];
	lands = []
	currentLand; 
	constructor(level){
		this.lands = [this.land0, 
					  this.land0, 
					  this.land0, 
					  this.land1, 
					  this.land1, 
					  this.land1, 
					  this.land2,
					  this.land2, 
					  this.land3,
					  this.land4,
					  this.land5,
					  this.land6

					 ];
		this.currentLand = new Land(this.lands[level]);
	}

	getLand(){
		return this.currentLand;
	}
}
