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

/*
* Creating the objects for playing the game. 
*/ 
var bubbleWand = new PIXI.Sprite( PIXI.Texture.fromImage( "bubbleWand.png" )); 
var bubble = new PIXI.Sprite( PIXI.Texture.fromImage( "bubble.png" )); 
var titleMenu = new PIXI.Sprite( PIXI.Texture.fromImage( "TitleScreen.png" )); 
var startButton = new PIXI.Sprite( PIXI.Texture.fromImage( "StartButton.png" )); 
var tutorialButton = new PIXI.Sprite( PIXI.Texture.fromImage( "TutorialButton.png" )); 
var creditsButton = new PIXI.Sprite( PIXI.Texture.fromImage( "CreditsButton.png" )); 
var titleButton = new PIXI.Sprite( PIXI.Texture.fromImage( "TitleButton.png" )); 

/*
var enemySprite = PIXI.Texture.fromImage( "enemy.png" ); 
var enemy = new PIXI.Sprite( enemySprite ); 

/*
* Populate the title screen and create buttons
*/ 
titleScreen.addChild( titleMenu ); 

// Add the start button to the title screen and its functionality 
titleScreen.addChild( startButton ); 
startButton.interactive = true; 
startButton.on( 'mousedown', startButtonClickHandler ); 

// Add the tutorial button to the title screen and its functionality 
titleScreen.addChild( tutorialButton ); 
tutorialButton.interactive = true;
tutorialButton.on( 'mousedown', tutorialButtonClickHandler );  

// Add the credits button to the title screen and its functionality
titleScreen.addChild( creditsButton ); 
creditsButton.interactive = true; 
creditsButton.on( 'mousedown', creditsButtonClickHandler ); 

titleButton.interactive = true; 
titleButton.on( 'mousedown', titleMenuButtonClickHandler ); 

/*
* Populate the tutorial screen 
*/ 


/* 
* Populate the credits screen 
*/ 


/*
* Populate the gameplay screen 
*/ 
gameplayScreen.addChild( bubbleWand ); 

/*
Constant Variables
*/
const bubbleWandX = 400; 
const bubbleWandY = 300; 
const bubbleSpeed = 20; 

/*
Variables 
*/
var score = 0;
var xDirection; 
var yDirection; 
var angle; 
var mousePosition = getMousePosition(); 
var bubbleShotFlag = false;
var index; 
var score = 0; 

var tutorialVisited = false; 
var creditsVisited = false; 
var gameVisited = false; 

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

titleButton.position.x = 95; 
titleButton.position.y = 30; 
titleButton.anchor.x = 0.5; 
titleButton.anchor.y = 0.5; 

bubbleWand.anchor.x = 0.5; 
bubbleWand.anchor.y = 0.5; 
bubbleWand.position.x = bubbleWandX; 
bubbleWand.position.y = bubbleWandY; 

titleMenu.anchor.x = 0.5; 
titleMenu.anchor.y = 0.5; 
titleMenu.position.x = 400; 
titleMenu.position.y = 300; 

bubble.anchor.x = 0.5; 
bubble.anchor.y = 0.5; 

/*
Functions 
*/

	
/*
* Desc: Used to find the position of the mouse and updates to mousePosition variable
*/ 
function getMousePosition(){ return renderer.plugins.interaction.mouse.global; }

/*
* Desc: Checks if space bar is pushed and prepares bubble for launch
*/ 
function shootbubble( e )
	{
		
	if( e.keyCode == 32 &&
			e.target == document.body )
		{

		// Make sure the space doesn't scroll the page
		e.preventDefault();
		
		screen++; 
		stage.removeChild( titleScreen ); 

		if( bubbleShotFlag == false )
			{
		
			spawnbubble( bubbleWand.position.x, bubbleWand.position.y, bubbleWand.rotation ); 
			
			bubbleShotFlag = true; 
			}
		}
	}	
	
/***************************************************
	Menu Button Functions 
****************************************************/
	
/*
* Desc: function that changes the screen to the game
*/ 
function startButtonClickHandler( e )
	{
		
	gameVisited = true; 
	stage.removeChild( titleScreen );
	stage.addChild( gameplayScreen ); 
	gameplayScreen.addChild( titleButton ); 
	
	renderer.backgroundColor = 0xffb18a; 
	}
	
/*
* Desc: Function that changes the screen to the tutorial 
*/ 
function tutorialButtonClickHandler( e )
	{
		
	tutorialVisited = true; 
	stage.removeChild( titleScreen );
	stage.addChild( tutorialScreen );
	
	tutorialScreen.addChild( titleButton ); 	
	renderer.backgroundColor = 0x7dadff;
	}
	
/*
* Desc: Function that changes the screen to the credits
*/ 
function creditsButtonClickHandler( e )
	{
		
	creditsVisited = true; 
	stage.removeChild( titleScreen );
	stage.addChild( creditsScreen ); 
	
	renderer.backgroundColor = 0xff759c;
	
	var creditsText = new PIXI.Text( "Made by Joshus Tenakhongva for CS413\nSpecial Thanks to Natalie Wynn whose videos I listenened \nto while doing this" ); 
	creditsText.position.x = 400; 
	creditsText.position.y = 300; 
	creditsText.anchor.x = 0.5; 
	creditsText.anchor.y = 0.5; 
	
	creditsScreen.addChild( titleButton ); 
	creditsScreen.addChild( creditsText ); 
	}
	
/*
* Desc: Function that changes the screen back to the title screen
*/ 
function titleMenuButtonClickHandler( e )
	{

	if( gameVisited ) 
		{ 
		stage.removeChild( gameplayScreen ); 
		gameVisited = false; 
		}
	if( creditsVisited ) 
		{ 
		stage.removeChild( creditsScreen ); 
		creditsVisited = false; 
		}
	if( tutorialVisited ) 
		{ 
		stage.removeChild( tutorialScreen ); 
		tutorialVisited = false; 
		}
		
	/*
	stage.removeChild( gameplayScreen ); 
	stage.removeChild( creditsScreen ); 
	stage.removeChild( tutorialScreen ); 
	*/ 

	stage.addChild( titleScreen ); 
	}
	
/*********************************************
	Game Functionality Functions 
************************************************/

/*
* Desc: Spawns the bubble at the bubbleWand's position and sets the rotation to 
* 	the same as the bubbleWand. 
*/ 
function spawnbubble( xPosition, yPosition, bubbleDirection )
	{
	
	stage.addChild( bubble ); 
	bubble.position.x = xPosition; 
	bubble.position.y = yPosition; 
	bubble.rotation = bubbleDirection;
	}
	
/*
* Desc: Changes the position of the bubble based on its rotation 
*/
function projectbubble( bubble, range, inMotion )
	{
	
	if( inMotion )
		{
		bubble.position.x = bubble.position.x + range * Math.cos( bubble.rotation ); 
		bubble.position.y = bubble.position.y + range * Math.sin( bubble.rotation ); 
		}
	}
	
/*
* Desc: Calculates and changes the bubbleWands direction based on moues position
*/ 
function calculateBubbleWandDirection()
	{
	
	xDirection = mousePosition.x - bubbleWand.position.x; 
	yDirection = mousePosition.y - bubbleWand.position.y; 
	angle = Math.atan2( yDirection, xDirection ); 
	bubbleWand.rotation = angle; 
	}
	
/*
* Desc: Checks if the bubble leaves the screen and removes it if so. 
*/ 
function checkbubbleOutOfBounds( bubble )
	{
		
	if( bubble.position.x <= 0 ||
			bubble.position.y <= 0 ||
			bubble.position.x >= 800 ||
			bubble.position.y >= 600 )
		{
			
		stage.removeChild( bubble ); 
		
		bubbleShotFlag = false; 
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

	calculateBubbleWandDirection(); 
	projectbubble( bubble, bubbleSpeed, bubbleShotFlag ); 
	
	checkbubbleOutOfBounds( bubble ); 

  document.getElementById( "score" ).innerHTML = score;
	}

document.addEventListener( 'keydown', shootbubble );
animate();
