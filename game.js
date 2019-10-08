var gameport = document.getElementById( "gameport" );
var renderer = PIXI.autoDetectRenderer(
												{ width: 800, height: 600, backgroundColor: 0x6ac48a });
gameport.appendChild( renderer.view );

/*
* Creating different containers
*/
var stage = new PIXI.Container();

var titleScreen = new PIXI.Container(); 
var gameplayScreen = new PIXI.Container(); 
var creditsScreen = new PIXI.Container(); 
var tutorialScreen = new PIXI.Container(); 
var containers = [ titleScreen, stage, creditsScreen, tutorialScreen ]; 

stage.addChild( titleScreen ); 
stage.addChild( gameplayScreen ); 
stage.addChild( creditsScreen ); 
stage.addChild( tutorialScreen );

titleScreen.interactive = true; 
stage.interactive = true; 
creditsScreen.interactive = true; 
tutorialScreen.interactive = true; 

/*
* Creating the objects for playing the game. 
*/ 
var cannon = new PIXI.Sprite( PIXI.Texture.fromImage( "Arrow.png" )); 
var bullet = new PIXI.Sprite( PIXI.Texture.fromImage( "Bullet.png" )); 
var titleMenu = new PIXI.Sprite( PIXI.Texture.fromImage( "TitleScreen.png" )); 
var startButton = new PIXI.Sprite( PIXI.Texture.fromImage( "StartButton.png" )); 
var tutorialButton = new PIXI.Sprite( PIXI.Texture.fromImage( "TutorialButton.png" )); 
var creditsButton = new PIXI.Sprite( PIXI.Texture.fromImage( "CreditsButton.png" )); 

/*
var enemySprite = PIXI.Texture.fromImage( "enemy.png" ); 
var enemy = new PIXI.Sprite( enemySprite ); 

/*
* Add objects to containers 
*/ 
titleScreen.addChild( titleMenu ); 
gameplayScreen.addChild( cannon ); 

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
var containerIndex; 
var score = 0; 

/*
Initializing object properties
*/
startButton.position.x = 400;  
startButton.position.y = 350; 
startButton.anchor.x = 0.5; 
startButton.anchor.y = 0.5; 

tutorialButton.position.x = 250; 
tutorialButton.position.y = 500;
tutorialButton.anchor.x = 0.5;
tutorialButton.anchor.y = 0.5; 

creditsButton.position.x = 550;
creditsButton.position.y = 500; 
creditsButton.anchor.x = 0.5; 
creditsButton.anchor.y = 0.5;  

cannon.anchor.x = 0.5; 
cannon.anchor.y = 0.5; 
cannon.position.x = cannonX; 
cannon.position.y = cannonY; 

titleMenu.anchor.x = 0.5; 
titleMenu.anchor.y = 0.5; 
titleMenu.position.x = 400; 
titleMenu.position.y = 300; 

bullet.anchor.x = 0.5; 
bullet.anchor.y = 0.5; 

/*
Functions 
*/

	
/*
* Desc: Used to find the position of the mouse and updates to mousePosition variable
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
		
		screen++; 
		stage.removeChild( titleScreen ); 
		
		/*
		if( bulletShotFlag == false )
			{
		
			spawnBullet( cannon.position.x, cannon.position.y, cannon.rotation ); 
			
			bulletShotFlag = true; 
			}
			*/
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
	
function clearScreen( container )
	{
		
	
	}
	
	/*
function chooseContainerToRender( containerArray )
	{
		

	for( containerIndex = 0; containerIndex < containerArray.length; containerIndex++ )
		{
			
		if( containerArray[ containerIndex ].visible == true )
			{
				
			renderer.render( containerArray[ containerIndex ] ); 
			}
		}
	}
	*/

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

  document.getElementById( "score" ).innerHTML = score;
	}

document.addEventListener( 'keydown', shootBullet );
animate();
