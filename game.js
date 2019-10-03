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
Variables */
var score = 0;
var xDirection; 
var yDirection; 
var angle; 
var radianAngle; 
const pi = Math.PI; 
var mousePosition = getMousePosition(); 

/*
Initializing object properties
*/
stage.addChild( cannon ); 
cannon.anchor.x = 0.5; 
cannon.anchor.y = 0.5; 
cannon.position.x = 400; 
cannon.position.y = 300; 

bullet.anchor.x = 0.5; 
bullet.anchor.y = 0.5; 

/*
Functions 
*/
function getMousePosition(){ return renderer.plugins.interaction.mouse.global; }

function shootBullet( e )
	{
		
	if( e.keyCode == 32 && e.target == document.body )
		{

		// Make sure the space doesn't scroll the page
		e.preventDefault();
		}
	}

function spawnBullet( xPosition, yPosition )
	{
	
	stage.addChild( bullet ); 
	bullet.position.x = xPosition; 
	bullet.position.y = yPosition; 
	}
	
function calculateDirection()
	{
	
	xDirection = mousePosition.x - cannon.position.x; 
	yDirection = mousePosition.y - cannon.position.y; 
	angle = Math.atan2( yDirection, xDirection ); 
	cannon.rotation = angle; 
	}
	
function checkBulletOutOfBounds( bullet )
	{
		
	if( bullet.position.x <= 0 ||
			bullet.position.y <= 0 ||
			bullet.position.x >= 800 ||
			bullet.position.y >= 600 )
		{
			
		stage.removeChild( bullet ); 
		}
	}

/*
animate function
*/
function animate()
	{

	requestAnimationFrame( animate );
	renderer.render( stage );
	
	calculateDirection(); 

  document.getElementById( "score" ).innerHTML = "1";
	}

document.addEventListener( 'keydown', shootBullet );
animate();
