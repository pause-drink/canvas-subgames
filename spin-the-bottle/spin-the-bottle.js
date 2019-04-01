console.log('Canvas subgame bundled spin the bottle being setup');

/*--------------------------------------------------------------------------
----------------------------------------------------------------------------
	Graphics - Setting up the Canvas here
----------------------------------------------------------------------------
---------------------------------------------------------------------------*/

pda.canvasSubgames["spin-the-bottle"] = (function() {

	var gameStage, bottle, w, h;

	init();

	function init() {
	    var comp=AdobeAn.getComposition("C10AF6F874E6874887F4BCA2F8A950E7");
	    var lib=comp.getLibrary();

	    var spinTheBottleManifest = [
	        {src: "ding.mp3", id: "dingSound"}
	    ];

	    var spinTheBottleLoader = new createjs.LoadQueue(false);
	    spinTheBottleLoader.installPlugin(createjs.Sound);   
	    spinTheBottleLoader.loadManifest(spinTheBottleManifest, true, "canvas/spin-the-bottle/");

		w = window.innerWidth;
	    h = window.innerHeight;	 
	    
		var bottle_mc = new lib.bottle();
	    var bottleBuilder = new createjs.SpriteSheetBuilder();
	    bottleBuilder.scale = 1.1;
	    bottleBuilder.maxWidth = 512;
	    bottleBuilder.addMovieClip(bottle_mc);
	    bottleBuilder.addEventListener("complete", bottleBuildComplete);
	    bottleBuilder.buildAsync(); 

		function bottleBuildComplete(event) {
		    var bottleSS = event.target.spriteSheet;
		    bottle = new createjs.Sprite(bottleSS);
			bottle.x = w/2;
			bottle.y = h/2;	 
			assetLoading();   
		}

		function assetLoading() {
			if(bottle) {
				console.log('assets are loaded');
				// initAssetListeners();
				setGameVariables();
				runGame();
			}
		}	

		// function initAssetListeners() {

		// }				           
	}

	function setGameVariables() {
		spinSpeed = 0;
		time = 0;
		begin = 0;
		change = 0;
		duration = 0;
		timeFactor = 7;
		spinFactor = 1000;
	}

	function runGame() {
		if (pda.canvasSubgames["spin-the-bottle"]) {
			pda.canvasSubgames.setCurrentGame(pda.canvasSubgames["spin-the-bottle"]);
		}
		
		var gameCanvas = document.getElementById("subGameCanvas");
		gameStage = new createjs.Stage(gameCanvas); // couldn't use stageGL???
		gameStage.canvas.width = w; 
		gameStage.canvas.height = h;
		// gameStage.setClearColor("#235b6d");
		// gameStage.updateViewport(w, h);			        
		gameStage.enableDOMEvents(true);
		createjs.Touch.enable(gameStage);

		setGameVariables();
		addAssetsToStage();
		addStageListeners();
		createjs.Ticker.addEventListener("tick", canvasSubgameTick);
	}

	function addAssetsToStage() {
		theBottle = bottle;
		gameStage.addChild(bottle);
	}

	/*--------------------------------------------------------------------------
	----------------------------------------------------------------------------
		Game Logic Here
	----------------------------------------------------------------------------
	---------------------------------------------------------------------------*/	

	// Game logic variables
	var touchX, touchY, newTime, prevTime, oldTime, newAngle, prevAngle, oldAngle, grabbed, spinning;
	var spinSpeed, time, begin, change, duration, timeFactor, spinFactor;		

	mouseIsDown = false;
	function addStageListeners() {
		gameStage.on('stagemousedown', function(evt) {
			mouseIsDown = true;
		});

		gameStage.on('stagemousemove', function(evt) {
			if(mouseIsDown) {
				touchX = evt.stageX;
				touchY = evt.stageY;

				oldTime = prevTime;
				prevTime = newTime;
				newTime = evt.timeStamp;

				// console.log(prevTime - oldTime);
				//Getting smaller time changes on the last evt before stagemouseup e.g 16, 17, 16, 5 

				if(grabbed) {
					rotateBottle();
				} else if (checkForHit()) {
					console.log('its a hit');

					grabbed = true;
					spinning = false;
					oldAngle = prevAngle = newAngle = getAngle();		
				}				
			}
		});	

		gameStage.on('stagemouseup', function(evt) {
			mouseIsDown = false;

			if(grabbed) {
				grabbed = false;

				spinSpeed = 0;
				time = 0;
				begin = 0;
				change = 0;
				duration = 0;		

				// console.log('input stuff: ', prevAngle, oldAngle, prevTime, oldTime);

				spinSpeed = 1000*(prevAngle - oldAngle)/(prevTime - oldTime);

				if(spinSpeed > spinFactor) {
					spinSpeed = spinFactor + spinSpeed/10;
				} else if (spinSpeed < -spinFactor) {
					spinSpeed = -spinFactor - spinSpeed/10;
				}

				console.log('spinspeed: ', spinSpeed);

				begin = spinSpeed;
				change = -spinSpeed;

				if(spinSpeed < 0) {
					duration = spinSpeed/(-360*timeFactor) + 3;
				} else {
					duration = spinSpeed/(360*timeFactor) + 3;
				}
				
				spinning = true;

				console.log('easing input: ', begin, change, duration);	
			}	
		});		
	}			

	function rotateBottle() {
		// console.log('rotating bottle with touch');
		oldAngle = prevAngle;
		prevAngle = newAngle;
		newAngle = getAngle();
		bottle.rotation += newAngle - prevAngle;

		// Again getting anomallies on the final stagemousemove event
		// console.log(prevAngle - oldAngle); 
	}

	function checkForHit() {
		var pt = bottle.globalToLocal(touchX, touchY);
		if (bottle.hitTest(pt.x, pt.y)) {
			return true;
		} else {
			return false;
		}
	}

	var deg2rad = Math.PI/180;
	var rad2deg = 180/Math.PI;

	function getAngle() {
		var localAngle;

		switch(getActiveZone()) {
		    case 'lefttop':
		        
		    	localAngle = Math.atan((w/2 - touchX)/(h/2 - touchY)) * rad2deg;
		    	return 360 - localAngle;

		    case 'righttop':

		        localAngle = Math.atan((touchX - w/2)/(h/2 - touchY)) * rad2deg;
		        return localAngle;

		    case 'rightbottom':

		        localAngle = Math.atan((touchY - h/2)/(touchX - w/2)) * rad2deg;
		        return 90 + localAngle;

		    case 'leftbottom':

		        localAngle = Math.atan((w/2 - touchX)/(touchY - h/2)) * rad2deg;
		        return 180 + localAngle;

		    default:
		        return 0;
		}	
	}

	function getActiveZone() {
		if(touchX < w/2) {
			zoneX = 'left';
		} else {
			zoneX = 'right';
		}

		if(touchY < h/2) {
			zoneY = 'top';
		} else {
			zoneY = 'bottom';
		}

		return zoneX + zoneY;
	}

	function canvasSubgameTick(event) {

		// if(grabbed) {
		// 	if(bottle.scaleX < 1.25) {
		// 		bottle.scaleX = bottle.scaleY += .08;	
		// 	}
		// } else {
		// 	bottle.scaleX = bottle.scaleY = 1;
		// }

		if(spinning) {
			grabbed = false;
			bottle.rotation += (prevTime - oldTime)/1000 * spinSpeed;
			time = time + (prevTime - oldTime)/1000;
			oldTime = prevTime;
			prevTime = new Date().getTime();	    
			spinSpeed = easeOutQuad(time, begin, change, duration); 

		    if(spinSpeed < 30 && spinSpeed > -30) {
		    	spinning = false;
		    	var dingSound = createjs.Sound.play('dingSound');
		    }		
		}

	    gameStage.update();
	}

	function easeOutQuad (t, b, c, d) {
		t /= d;
		return c*t*t + b;
	};

	function destroyGame(event) {
		if(event) {
			if(!$$(event.target).is('.btn')) {
				finalDestruction();
				return
			}			
		} else {
			finalDestruction();
		}

		function finalDestruction() {
			console.log('final destruction of spin the bottle');
			$$('.container-subgame').off('click', destroyGame);
			pda.canvasSubgames.setCurrentGame(undefined);
			createjs.Ticker.removeEventListener("tick", canvasSubgameTick);
			gameStage.enableDOMEvents(false);
			gameStage.removeAllChildren();
			gameStage.removeAllEventListeners();
			gameStage.clear();
			gameStage = {};
			// gameStage.uncache(); // don't do this to preserve cached assets

			$$('#subGameCanvas').remove();
			$$('.popup-canvas-game').prepend('<canvas id="subGameCanvas" width="320" height="480"></canvas>');				
		}
	}

	function getGameStage() {
		return gameStage;
	}			

	return {
		init: init,
		reset: setGameVariables,
		run: runGame,
		getStage: getGameStage,
		tick: canvasSubgameTick,
		destroyGame: destroyGame
	}

})();

pda.canvasSubgames.setCurrentGame(pda.canvasSubgames["spin-the-bottle"]);