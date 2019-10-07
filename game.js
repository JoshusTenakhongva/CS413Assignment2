var gameport = document.getElementById( "gameport" );
var renderer = PIXI.autoDetectRenderer(
												{ width: 800, height: 600, backgroundColor: 0x6ac48a });
gameport.appendChild( renderer.view );

/*
Creating stage and objects 
*/
var stage = new PIXI.Container();
stage.interactive = true; 

var cannon = new PIXI.Sprite( PIXI.Texture.fromImage( "Arrow.png" )); 
var bullet = new PIXI.Sprite( PIXI.Texture.fromImage( "Bullet.png" )); 

/*
Constant Variables
*/

const cannonX = 400; 
const cannonY = 300; 
const bulletSpeed = 20; 

/*
Variables 
*/
var score = 0;
var xDirection; 
var yDirection; 
var angle; 
var mousePosition = getMousePosition(); 

var bulletShotFlag = false;

/*
Initializing object properties
*/
stage.addChild( cannon ); 
cannon.anchor.x = 0.5; 
cannon.anchor.y = 0.5; 
cannon.position.x = cannonX; 
cannon.position.y = cannonY; 

bullet.anchor.x = 0.5; 
bullet.anchor.y = 0.5; 

/*
Functions 
*/
function getMousePosition(){ return renderer.plugins.interaction.mouse.global; }

/*
* Desc: Checks if space bar is pushed and prepares bullet for launch
*/ 
function shootBullet( e )
	{
		
	if( e.keyCode == 32 &&
			e.target == document.body )
		{

		// Make sure the space doesn't scroll the page
		e.preventDefault();
		
		if( bulletShotFlag == false )
			{
		
			spawnBullet( cannon.position.x, cannon.position.y, cannon.rotation ); 
			
			bulletShotFlag = true; 
			}
		}
	}

/*
* Desc: Spawns the bullet at the cannon's position and sets the rotation to 
* 	the same as the cannon. 
*/ 
function spawnBullet( xPosition, yPosition, bulletDirection )
	{
	
	stage.addChild( bullet ); 
	bullet.position.x = xPosition; 
	bullet.position.y = yPosition; 
	bullet.rotation = bulletDirection;
	}
	
/*
* Desc: Changes the position of the bullet based on its rotation 
*/
function projectBullet( bullet, range, inMotion )
	{
	
	if( inMotion )
		{
		bullet.position.x = bullet.position.x + range * Math.cos( bullet.rotation ); 
		bullet.position.y = bullet.position.y + range * Math.sin( bullet.rotation ); 
		}
	}
	
/*
* Desc: Calculates and changes the cannons direction based on moues position
*/ 
function calculateCannonDirection()
	{
	
	xDirection = mousePosition.x - cannon.position.x; 
	yDirection = mousePosition.y - cannon.position.y; 
	angle = Math.atan2( yDirection, xDirection ); 
	cannon.rotation = angle; 
	}
	
/*
* Desc: Checks if the bullet leaves the screen and removes it if so. 
*/ 
function checkBulletOutOfBounds( bullet )
	{
		
	if( bullet.position.x <= 0 ||
			bullet.position.y <= 0 ||
			bullet.position.x >= 800 ||
			bullet.position.y >= 600 )
		{
			
		stage.removeChild( bullet ); 
		
		bulletShotFlag = false; 
		}
	}

/*
animate function
*/
function animate()
	{

	requestAnimationFrame( animate );
	renderer.render( stage );
	
	calculateCannonDirection(); 
	projectBullet( bullet, bulletSpeed, bulletShotFlag ); 
	
	checkBulletOutOfBounds( bullet ); 

  document.getElementById( "score" ).innerHTML = "1";
	}

document.addEventListener( 'keydown', shootBullet );
animate();
