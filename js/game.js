////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */
//trains array
var trains_arr = [{src:'assets/trainHead01.png', head:true},
				{src:'assets/trainHead02.png', head:true},
				{src:'assets/trainHead03.png', head:true},
				{src:'assets/train01.png', head:false},
				{src:'assets/train02.png', head:false},
				{src:'assets/train03.png', head:false},
				{src:'assets/train04.png', head:false},
				{src:'assets/train05.png', head:false},
				{src:'assets/train06.png', head:false},
				{src:'assets/train07.png', head:false}];

var boostSpeedNumber = 3; //boost speed number
var boostColour = '#FF7F00'; //boost shadow colour
var crashColour = '#FF0000'; //crash shadow colour

//maps array
var levels_arr = [
				//map 01
				{src:'assets/map01.png', thumb:'assets/thumb01.png', name:'LEVEL 1', length:3, target:{start:3, increase:3}, timer:{start:8000, decrease:200}, speed:{start:1, increase:.1}, rails:[
					//rail01
					{speed:8,delay:0.75,path:[{x:1123, y:235}, {x:966, y:232}, {x:800, y:230}, {x:699, y:235}, {x:680, y:330}, {x:674, y:439}, {x:573, y:449}, {x:288, y:447}, {x:-95, y:449}, ]},
					//rail02
					{speed:6,delay:0.6,path:[{x:-94, y:616}, {x:183, y:614}, {x:397, y:615}, {x:454, y:611}, {x:464, y:562}, {x:461, y:215}, {x:465, y:-98}, ]},
				]},

				//map 02
				{src:'assets/map02.png', thumb:'assets/thumb02.png', name:'LEVEL 2', length:5, target:{start:3, increase:3}, timer:{start:10000, decrease:200}, speed:{start:1, increase:.1}, rails:[
					//rail01
					{speed:10,delay:0.65,path:[{x:967, y:-99}, {x:966, y:242}, {x:968, y:571}, {x:957, y:669}, {x:870, y:680}, {x:782, y:677}, {x:758, y:601}, {x:745, y:469}, {x:623, y:461}, {x:286, y:462}, {x:-99, y:464}, ]},
					//rail02
					{speed:6,delay:0.75,path:[{x:565, y:868}, {x:563, y:740}, {x:566, y:467}, {x:562, y:222}, {x:564, y:-102}, ]},
					//rail03
					{speed:6,delay:0.7,path:[{x:-102, y:172}, {x:107, y:172}, {x:237, y:173}, {x:322, y:187}, {x:348, y:267}, {x:348, y:513}, {x:349, y:865}, ]},
				]},

				//map 03
				{src:'assets/map03.png', thumb:'assets/thumb03.png', name:'LEVEL 3', length:3, target:{start:3, increase:3}, timer:{start:15000, decrease:200}, speed:{start:1, increase:.1}, rails:[
					//rail01
					{speed:10,delay:0.9,path:[{x:677, y:-99}, {x:678, y:245}, {x:681, y:433}, {x:659, y:538}, {x:558, y:536}, {x:155, y:530}, {x:-97, y:534}, ]},
					//rail02
					{speed:6,delay:0.77,path:[{x:779, y:869}, {x:772, y:690}, {x:778, y:425}, {x:776, y:189}, {x:775, y:-103}, ]},
					//rail03
					{speed:6,delay:0.74,path:[{x:-102, y:386}, {x:159, y:388}, {x:377, y:392}, {x:484, y:402}, {x:489, y:500}, {x:486, y:675}, {x:490, y:865}, ]},
					//rail04
					{speed:6,delay:0.67,path:[{x:-102, y:705}, {x:46, y:705}, {x:176, y:706}, {x:240, y:702}, {x:249, y:640}, {x:251, y:314}, {x:247, y:-93}, ]},
					//rail05
					{speed:6,delay:0.6,path:[{x:-102, y:198}, {x:61, y:198}, {x:521, y:199}, {x:782, y:196}, {x:1125, y:200}, ]},
				]},

				



				];

var textResultTitle = 'BEST SCORE:'; //text for game result title

//Social share, [SCORE] will replace with game time
var shareText = 'SHARE YOUR SCORE'; //share text
var shareTitle = 'Highscore on Rail Rush is [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on Rail Rush! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */

var editTrack = false;
var playerData = {score:0};
var gameData = {paused:true, hitted:false, map:0, rail_arr:[], trains_arr:[], scoreTarget:0, timer:0, speed:1, endInterval:null, collisionTimer:0, collisionTimerTarget:100};
var collisionMethod = ndgmr.checkPixelCollision;

/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */
function buildGameButton(){
	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('select');
	});

	buttonSelect.cursor = "pointer";
	buttonSelect.addEventListener("mousedown", function(evt) {
		playSound('soundButton');
		goPage('game');
	});

	buttonArrowLeft.cursor = "pointer";
	buttonArrowLeft.addEventListener("mousedown", function(evt) {
		toggleSelect(false);
	});

	buttonArrowRight.cursor = "pointer";
	buttonArrowRight.addEventListener("mousedown", function(evt) {
		toggleSelect(true);
	});

	for(n=0;n<levels_arr.length;n++){
		$.thumbs['thumb_'+n].name = n;
		$.thumbs['thumb_'+n].cursor = "pointer";
		$.thumbs['thumb_'+n].addEventListener("mousedown", function(evt) {
			selectTrackThumbs(evt.target.name);
		});
	}

	btnContinue.cursor = "pointer";
	btnContinue.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('select');
	});

	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonGoogle.cursor = "pointer";
	buttonGoogle.addEventListener("click", function(evt) {
		share('google');
	});
}

/*!
 *
 * SELECT MAPS - This is the function that runs to display select maps
 *
 */
var selectPageNum = 1;
var selectPageTotal = 1;
var maxThumbPerPage = 3;
function buildSelectPagination(){
	selectPageTotal=levels_arr.length/maxThumbPerPage;
	if (String(selectPageTotal).indexOf('.') > -1){
		selectPageTotal=Math.floor(selectPageTotal)+1;
	}
	toggleSelect(false);
}

function toggleSelect(con){
	if(con){
		selectPageNum++;
		selectPageNum = selectPageNum > selectPageTotal ? selectPageTotal : selectPageNum;
	}else{
		selectPageNum--;
		selectPageNum = selectPageNum < 1 ? 1 : selectPageNum;
	}
	selectPage(selectPageNum);
}

function selectPage(num){
	selectPageNum = num;
	bgThumbSelected.visible = false;

	var startNum = (selectPageNum-1) * maxThumbPerPage;
	var endNum = startNum + (maxThumbPerPage-1);
	var thumbCount = 1;

	for(n=1;n<=3;n++){
		this['txtThumbText'+n].text = '';
	}

	var thumbCount = 0;
	for(n=0;n<levels_arr.length;n++){
		if(n >= startNum && n <= endNum){
			thumbCount++;
			$.thumbs['thumb_'+n].visible = true;
			this['txtThumbText'+(thumbCount)].text = levels_arr[n].name;
		}else{
			$.thumbs['thumb_'+n].visible = false;
		}
	}

	if(selectPageNum == 1){
		buttonArrowLeft.visible = false;
	}else{
		buttonArrowLeft.visible = true;
	}

	if(selectPageNum == selectPageTotal || selectPageTotal == 1){
		buttonArrowRight.visible = false;
	}else{
		buttonArrowRight.visible = true;
	}
}

function selectTrackThumbs(num){
	gameData.map = num;
	bgThumbSelected.x = $.thumbs['thumb_'+num].x;
	bgThumbSelected.y = $.thumbs['thumb_'+num].y;
	bgThumbSelected.visible = true;
}

/*!
 *
 * DISPLAY PAGES - This is the function that runs to display pages
 *
 */
var curPage=''
function goPage(page){
	curPage=page;

	mainContainer.visible=false;
	selectContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;

	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			playSoundLoop('musicMain');
		break;

		case 'select':
			targetContainer = selectContainer;
		break;

		case 'game':
			targetContainer = gameContainer;

			if(editTrack){
				loadEditPage();
			}else{
				stopSoundLoop('musicMain');
				playSoundLoop('musicGame');
				startGame();
			}
		break;

		case 'result':
			targetContainer = resultContainer;

			txtResultLevel.text = levels_arr[gameData.map].name;
			txtResultScore.text = playerData.score;

			stopSoundLoop('musicGame');
			playSoundLoop('musicMain');
			playSound('soundEnd');
			stopGame();
			saveGame(playerData.score);
		break;
	}

	targetContainer.visible=true;
}

/*!
 *
 * START GAME - This is the function that runs to start play game
 *
 */
function startGame(){
	trainIDNum = 0;
	playerData.score = 0;
	gameData.collisionTimer = new Date();
	updateScoreDisplay();

	loadMaps();
	startRailsTimer();
	gameData.hitted = false;
	gameData.paused = false;
}

 /*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame(){
	gameData.paused = true;
	clearInterval(gameData.endInterval);
	removeAllTrains();
}

 /*!
 *
 * SAVE GAME - This is the function that runs to save game
 *
 */
function saveGame(score){
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 *
 * GAME LOOP - This is the function that runs for game loop
 *
 */
function updateGame(event){
	if(!gameData.paused && !editTrack){
		checkRailsTimer();
		checkTrainCollision();
	}
}

/*!
 *
 * CHECK RAILS TIMER - This is the function that runs check rails timer
 *
 */
function checkRailsTimer(){
	var nowDate = new Date();
	for(n=0;n<gameData.rail_arr.length;n++){
		var elapsedTime = (nowDate.getTime() - gameData.rail_arr[n].timer.getTime());
		if(elapsedTime >= gameData.rail_arr[n].timerTarget){
			createNewTrain(n);
			updateRailTimer(n);
		}
	}
}

/*!
 *
 * CHECK TRAIN COLLISION - This is the function that runs to check train collision
 *
 */
function checkTrainCollision(){
	var nowDate = new Date();
	var checkCollision = false;

	var elapsedTime = (nowDate.getTime() - gameData.collisionTimer.getTime());
	if(elapsedTime > gameData.collisionTimerTarget){
		gameData.collisionTimer = new Date();
		checkCollision = true;
	}

	if(checkCollision){
		for(n=0;n<gameData.trains_arr.length;n++){
			var curTrain = gameData.trains_arr[n].obj;
			for(h=0;h<gameData.trains_arr.length;h++){
				var crossTrain = gameData.trains_arr[h].obj;
				if(n!=h && curTrain.trainIDNum != crossTrain.trainIDNum && crossTrain.hit){
					var intersection = collisionMethod(curTrain, crossTrain);

					if(intersection){
						animateTrainCrash(curTrain.trainIDNum, crossTrain.trainIDNum);
					}

					/*var pt = curTrain.globalToLocal(crossTrain.x * scalePercent, crossTrain.y * scalePercent);

					if(curTrain.hitTest(pt.x, pt.y)) {
						animateTrainCrash(curTrain.trainIDNum, crossTrain.trainIDNum);
					}*/

					/*for(t=0;t<6;t++){
						var point = {x:0, y:0};
						if(t==0){
							getAnglePosition(point, crossTrain.x, crossTrain.y, 50, crossTrain.rotation-20);
						}else if(t==1){
							getAnglePosition(point, crossTrain.x, crossTrain.y, 50, crossTrain.rotation+20);
						}else if(t==2){
							getAnglePosition(point, crossTrain.x, crossTrain.y, 50, (crossTrain.rotation+180)-20);
						}else if(t==3){
							getAnglePosition(point, crossTrain.x, crossTrain.y, 50, (crossTrain.rotation+180)+20);
						}else if(t==4){
							getAnglePosition(point, crossTrain.x, crossTrain.y, 20, (crossTrain.rotation+90));
						}else if(t==5){
							getAnglePosition(point, crossTrain.x, crossTrain.y, 20, (crossTrain.rotation-90));
						}
						var pt = curTrain.globalToLocal(point.x * scalePercent, point.y * scalePercent);

						if(curTrain.hitTest(pt.x, pt.y)) {
							animateTrainCrash(curTrain.trainIDNum, crossTrain.trainIDNum);
						}
					}*/
				}
			}
		}
	}
}

/*!
 *
 * LOAD MAPS - This is the function that runs to load maps
 *
 */
function loadMaps(){
	for(n=0;n<levels_arr.length;n++){
		$.maps[n].visible = false;
	}
	$.maps[gameData.map].visible = true;
}

/*!
 *
 * START RAILS TIMER - This is the function that runs to start rails timer
 *
 */
function startRailsTimer(){
	gameData.scoreTarget = levels_arr[gameData.map].target.start;
	gameData.timer = levels_arr[gameData.map].timer.start;
	gameData.speed = levels_arr[gameData.map].speed.start;

	gameData.rail_arr = [];

	var randomRailTimer_arr = [];
	for(n=0;n<levels_arr[gameData.map].rails.length;n++){
		randomRailTimer_arr.push(n);
	}
	shuffle(randomRailTimer_arr);

	for(n=0;n<levels_arr[gameData.map].rails.length;n++){
		var randomTimer = Math.floor(Math.random()*1500);
		gameData.rail_arr.push({timer:new Date(), timerTarget:randomTimer});
		if(n == randomRailTimer_arr[0] || n == randomRailTimer_arr[1]){

		}else{
			updateRailTimer(n);
		}
	}
}

function updateRailTimer(n){
	gameData.rail_arr[n].timer = new Date();
	gameData.rail_arr[n].timerTarget = (gameData.timer/2) + Math.floor(Math.random()*(gameData.timer/2));
}

/*!
 *
 * CREATE NEW TRAIN - This is the function that runs to create new train
 *
 */
var trainIDNum = 0;
function createNewTrain(railNum){
	playSound('soundTrainComing');

	var delayNum = 0;
	var railPath = levels_arr[gameData.map].rails[railNum].path;
	var tweenSpeed = levels_arr[gameData.map].rails[railNum].speed;
	var tweenDelay = levels_arr[gameData.map].rails[railNum].delay;

	var trainLength = Math.floor(Math.random()*levels_arr[gameData.map].length);
	trainLength += 1;
	trainLength = trainLength == 1 ? 2 : trainLength;

	for(t=0;t<trainLength;t++){
		var newTrain = $.trains[getTrainType(t)].clone();
		newTrain.trainIDNum = trainIDNum;
		newTrain.railNum = railNum;
		newTrain.boost = false;
		newTrain.hit = false;
		newTrain.alpha = 0;
		gameData.trains_arr.push({obj:newTrain, tween:''});

		var curTrainNum = gameData.trains_arr.length - 1;
		gameData.trains_arr[curTrainNum].tween = TweenMax.to(gameData.trains_arr[curTrainNum].obj, tweenSpeed, {delay:delayNum, bezier:{type:"quadratic", values:railPath, autoRotate:true}, ease:Linear.easeNone, repeat:0, overwrite:true, onStart:trainStartAnimation, onStartParams:[newTrain], onComplete:removeTrain, onCompleteParams:[newTrain]});
		delayNum += tweenDelay;
		gameData.trains_arr[curTrainNum].tween.timeScale(gameData.speed);

		trainContainer.addChild(newTrain);

		newTrain.cursor = "pointer";
		newTrain.addEventListener("click", function(evt) {
			boostTrain(evt.target);
		});
	}

	trainIDNum++;
}

function trainStartAnimation(train){
	train.alpha = 1;
	train.hit = true;
}

/*!
 *
 * REMOVE TRAINS - This is the function that runs to remove trains
 *
 */
function removeTrain(train){
	for(r=0;r<gameData.trains_arr.length;r++){
		var checkTrain = gameData.trains_arr[r].obj;
		if(checkTrain == train){
			gameData.trains_arr.splice(r,1);
			trainContainer.removeChild(train);
		}
	}

	if(!editTrack){
		var trainLength = 0;
		for(r=0;r<gameData.trains_arr.length;r++){
			var checkTrain = gameData.trains_arr[r].obj;
			if(checkTrain.trainIDNum == train.trainIDNum){
				trainLength++;
			}
		}

		if(trainLength <= 0){
			updateScore();
		}
	}
}

function removeAllTrains(){
	for(n=0;n<gameData.trains_arr.length;n++){
		TweenMax.killTweensOf(gameData.trains_arr[n].obj);
		trainContainer.removeChild(gameData.trains_arr[n].obj);
	}
	gameData.trains_arr = [];
}

/*!
 *
 * GET TRAIN TYPE - This is the function that runs to get train type
 *
 */
function getTrainType(num){
	var isHead = false;
	if(num == 0){
		isHead = true;
	}

	var trainSort_arr = [];
	for(g=0;g<trains_arr.length;g++){
		if(isHead){
			if(trains_arr[g].head){
				trainSort_arr.push(g);
			}
		}else{
			if(!trains_arr[g].head){
				trainSort_arr.push(g);
			}
		}
	}

	shuffle(trainSort_arr);
	var randomArrayNum = Math.floor(Math.random()*trainSort_arr.length);

	return Number(trainSort_arr[randomArrayNum]);
}

/*!
 *
 * BOOST TRAIN - This is the function that runs to boost train
 *
 */
function boostTrain(train){
	if(!train.boost){
		var railPath = levels_arr[gameData.map].rails[train.railNum].path;
		for(b=0;b<gameData.trains_arr.length;b++){
			if(gameData.trains_arr[b].obj.trainIDNum == train.trainIDNum){
				gameData.trains_arr[b].obj.shadow = new createjs.Shadow(boostColour, 5* scalePercent, 5* scalePercent, 10* scalePercent);
				gameData.trains_arr[b].tween.timeScale(gameData.speed * boostSpeedNumber);
			}
		}
	}

	playSound('soundTrainBoost');
	for(b=0;b<gameData.trains_arr.length;b++){
		if(gameData.trains_arr[b].obj.trainIDNum == train.trainIDNum){
			gameData.trains_arr[b].obj.boost = true;
		}
	}
}

/*!
 *
 * UPDATE SCORE - This is the function that runs to update game score
 *
 */
function updateScore(){
	playSound('soundScore');
	playerData.score++;
	updateScoreDisplay();

	if(playerData.score >= gameData.scoreTarget){
		updateLevel();
	}
}

/*!
 *
 * UPDATE LEVEL - This is the function that runs to update game level
 *
 */
function updateLevel(){
	gameData.scoreTarget += levels_arr[gameData.map].target.increase;
	gameData.speed += levels_arr[gameData.map].speed.increase;
	gameData.timer -= levels_arr[gameData.map].timer.decrease;
	gameData.timer = gameData.timer < 3000 ? 3000 : gameData.timer;
}

/*!
 *
 * UPDATE SCORE DISPLAY - This is the function that runs to update score display
 *
 */
function updateScoreDisplay(){
	txtScore.text = playerData.score;
}

/*!
 *
 * ANIMATE TRAIN CRASH - This is the function that runs to animate train crash
 *
 */
function animateTrainCrash(id, hitID){
	gameData.paused = true;

	if(!gameData.hitted){
		gameData.hitted = true;
		for(n=0;n<gameData.trains_arr.length;n++){
			TweenMax.killTweensOf(gameData.trains_arr[n].obj);

			var crashTrain = gameData.trains_arr[n].obj;
			if(crashTrain.trainIDNum == id || crashTrain.trainIDNum == hitID){
				if(crashTrain.hit){
					crashTrain.shadow = new createjs.Shadow(crashColour, 1* scalePercent, 1* scalePercent, 3* scalePercent);
					toggleFade(crashTrain);
				}
			}
		}

		playSound('soundTrainCrash');
		gameData.endInterval = setInterval(function(){ goPage('result');}, 3000);
	}
}

function toggleFade(train){
	var alphaNum = 1;
	if(train.alpha == 1){
		alphaNum = .5;
	}
	TweenMax.to(train, .5, {alpha:alphaNum, overwrite:true, onComplete:toggleFade, onCompleteParams:[train]});
}

/*!
 *
 * SHARE - This is the function that runs to open share url
 *
 */
function share(action){
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	title = shareTitle.replace("[SCORE]", playerData.score);
	text = shareMessage.replace("[SCORE]", playerData.score);
	var shareurl = '';

	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}

	window.open(shareurl);
}
