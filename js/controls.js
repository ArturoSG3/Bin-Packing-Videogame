var game = new Phaser.Game(500, 500, Phaser.CANVAS, 'phaser-example', { preload:preload, create: create, update: update, render: render });

function preload(){
	game.load.image('background','assets/background.jpg');
}

function create (){
	game.add.image(800, 800, 'background');
}