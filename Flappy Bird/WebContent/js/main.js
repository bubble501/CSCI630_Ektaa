var game=new Phaser.Game(400,490,Phaser.AUTO,'gameDiv', {preload:preload, create:create, update:update, jump:jump, restart:restart, addOnePipe:addOnePipe, addRowOfPipes:addRowOfPipes});

function preload()
{
	game.stage.backgroundColor='#71c5cf';
	game.load.image('bird','./assets/pipe.png');
	game.load.image('pipe','./assets/bird.png');
}

function create()
{
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.bird=this.game.add.sprite(100,245,'bird');
	game.physics.arcade.enable(this.bird);
	this.bird.body.gravity.y=1000;
	var spaceKey=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spaceKey.onDown.add(this.jump,this);
	
	this.pipes=game.add.group();
	this.pipes.enableBody=true;
	this.pipes.createMultiple(20, 'pipe');
	this.timer=game.time.events.loop(1500, this.addRowOfPipes, this);
}

function update()
{
	if(this.bird.inWorld==false)
	{
		this.restartGame();
	}
}

function jump()
{
	this.bird.body.velocity.y=-350;
}

function restart()
{
	game.state.start('main');
}

function addOnePipe(x,y)
{
	var pipe=this.pipes.getFirstDead();
	pipe.reset(x,y);
	pipe.body.velocity.x=-200;
	pipe.checkWorldBounds=true;
	pipe.outOfBoundsKill=true;
}

function addRowOfPipes()
{
	var hole=Math.floor(Math.random()*5)+1;
	for(var i=0;i<8;i++)
		{
			if(i!=hole && i!=hole+1)
				{
					this.addOnePipe(400, i*60+10);
				}
		}
}