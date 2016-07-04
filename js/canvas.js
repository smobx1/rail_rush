////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = false;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, editContainer, mainContainer, selectContainer, gameContainer, trainContainer, resultContainer;
var background, logo, buttonStart, bgSelect, bgThumb1, bgThumb2, bgThumb3, txtThumbText1, txtThumbText2, txtThumbText3, bgThumbSelected, buttonSelect, buttonArrowLeft, buttonArrowRight, txtScore, scoreBoard, buttonFacebook, buttonTwitter, buttonGoogle, txtResultLevel, txtResultTitle, txtResultScore, txtShare;

$.trains = {};
$.thumbs = {};
$.maps = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	editContainer = new createjs.Container();
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	selectContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	trainContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	background = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 85;
	
	bgSelect = new createjs.Bitmap(loader.getResult('bgSelect'));
	bgThumbSelected = new createjs.Bitmap(loader.getResult('bgSelectThumbSelected'));
	bgThumb1 = new createjs.Bitmap(loader.getResult('bgSelectThumb'));
	bgThumb2 = new createjs.Bitmap(loader.getResult('bgSelectThumb'));
	bgThumb3 = new createjs.Bitmap(loader.getResult('bgSelectThumb'));
	
	buttonSelect = new createjs.Bitmap(loader.getResult('buttonSelect'));
	buttonArrowLeft = new createjs.Bitmap(loader.getResult('buttonArrow'));
	buttonArrowRight = new createjs.Bitmap(loader.getResult('buttonArrow'));
	centerReg(bgSelect);
	centerReg(bgThumb1);
	centerReg(bgThumb2);
	centerReg(bgThumb3);
	centerReg(bgThumbSelected);
	centerReg(buttonSelect);
	centerReg(buttonArrowLeft);
	centerReg(buttonArrowRight);
	
	bgThumb1.x = canvasW/100*25;
	bgThumb2.x = canvasW/2;
	bgThumb3.x = canvasW/100*75;
	bgThumb1.y = bgThumb2.y = bgThumb3.y = canvasH/100 * 45;
	
	txtThumbText1 = new createjs.Text();
	txtThumbText1.font = "40px bazarmedium";
	txtThumbText1.color = "#ffffff";
	txtThumbText1.text = '10';
	txtThumbText1.textAlign = "center";
	txtThumbText1.textBaseline='alphabetic';
	txtThumbText1.x = bgThumb1.x;
	txtThumbText1.y = bgThumb1.y + 160;
	
	txtThumbText2 = new createjs.Text();
	txtThumbText2.font = "40px bazarmedium";
	txtThumbText2.color = "#ffffff";
	txtThumbText2.text = '10';
	txtThumbText2.textAlign = "center";
	txtThumbText2.textBaseline='alphabetic';
	txtThumbText2.x = bgThumb2.x;
	txtThumbText2.y = bgThumb2.y + 160;
	
	txtThumbText3 = new createjs.Text();
	txtThumbText3.font = "40px bazarmedium";
	txtThumbText3.color = "#ffffff";
	txtThumbText3.text = '10';
	txtThumbText3.textAlign = "center";
	txtThumbText3.textBaseline='alphabetic';
	txtThumbText3.x = bgThumb3.x;
	txtThumbText3.y = bgThumb3.y + 160;
	
	bgSelect.x = canvasW/2;
	bgSelect.y = canvasH/2;
	buttonArrowLeft.x = canvasW/100 * 20;
	buttonArrowLeft.y = canvasH/100 * 77;
	buttonArrowRight.x = canvasW/100 * 80;
	buttonArrowRight.y = canvasH/100 * 77;
	buttonArrowRight.scaleX = -1;
	buttonSelect.x = canvasW/2;
	buttonSelect.y = canvasH/100 * 77;
	selectContainer.addChild(bgSelect, bgThumb1, bgThumb2, bgThumb3, txtThumbText1, txtThumbText2, txtThumbText3, bgThumbSelected, buttonSelect, buttonArrowLeft, buttonArrowRight);
	
	for(n=0;n<trains_arr.length;n++){
		$.trains[n] = new createjs.Bitmap(loader.getResult('train'+n));
		centerReg($.trains[n]);
		gameContainer.addChild($.trains[n]);
	}
	
	var thumbCount = 1;
	for(n=0;n<levels_arr.length;n++){
		$.thumbs['thumb_'+n] = new createjs.Bitmap(loader.getResult('thumb_'+n));
		centerReg($.thumbs['thumb_'+n]);
		$.thumbs['thumb_'+n].x = this["bgThumb"+thumbCount].x;
		$.thumbs['thumb_'+n].y = this["bgThumb"+thumbCount].y;
		thumbCount++;
		if(thumbCount>3){
			thumbCount = 1;
		}
		selectContainer.addChild($.thumbs['thumb_'+n]);
		
		$.maps[n] = new createjs.Bitmap(loader.getResult('map'+n));
		gameContainer.addChild($.maps[n]);
	}
	
	/*train = $.trains[0].clone();
	train.x = canvasW/100 * 60;
	train.y = canvasH/100 * 30;
	train.rotation = 100;
	
	shape1 = new createjs.Shape();
	shape1.graphics.beginFill("red").drawRect(-5, -5, 10, 10);
	
	shape2 = new createjs.Shape();
	shape2.graphics.beginFill("red").drawRect(-5, -5, 10, 10);
	
	shape3 = new createjs.Shape();
	shape3.graphics.beginFill("red").drawRect(-5, -5, 10, 10);
	
	shape4 = new createjs.Shape();
	shape4.graphics.beginFill("red").drawRect(-5, -5, 10, 10);
	
	shape5 = new createjs.Shape();
	shape5.graphics.beginFill("red").drawRect(-5, -5, 10, 10);
	
	shape6 = new createjs.Shape();
	shape6.graphics.beginFill("red").drawRect(-5, -5, 10, 10);
	
	getAnglePosition(shape1, train.x, train.y, 50, train.rotation-20);
	getAnglePosition(shape2, train.x, train.y, 50, train.rotation+20);
	getAnglePosition(shape3, train.x, train.y, 50, (train.rotation+180)-20);
	getAnglePosition(shape4, train.x, train.y, 50, (train.rotation+180)+20);
	getAnglePosition(shape5, train.x, train.y, 20, (train.rotation+90));
	getAnglePosition(shape6, train.x, train.y, 20, (train.rotation-90));
	gameContainer.addChild(train, shape1, shape2, shape3, shape4, shape5, shape6);*/
	
	scoreBoard = new createjs.Bitmap(loader.getResult('scoreBoard'));
	centerReg(scoreBoard);
	scoreBoard.x = canvasW/100 * 90;
	scoreBoard.y = canvasH/100 * 7.5;
	
	txtScore = new createjs.Text();
	txtScore.font = "70px bazarmedium";
	txtScore.color = "#ffffff";
	txtScore.text = '10';
	txtScore.textAlign = "center";
	txtScore.textBaseline='alphabetic';
	txtScore.x = canvasW/100 * 90;
	txtScore.y = canvasH/100 * 10;
	
	bgResult = new createjs.Bitmap(loader.getResult('bgResult'));
	btnContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(btnContinue);
	btnContinue.x = canvasW/2;
	btnContinue.y = canvasH/100 * 85;
	
	txtResultLevel = new createjs.Text();
	txtResultLevel.font = "60px bazarmedium";
	txtResultLevel.color = "#e0eaf3";
	txtResultLevel.text = textResultTitle;
	txtResultLevel.textAlign = "center";
	txtResultLevel.textBaseline='alphabetic';
	txtResultLevel.x = canvasW/2;
	txtResultLevel.y = canvasH/100 * 23;
	
	txtResultTitle = new createjs.Text();
	txtResultTitle.font = "80px bazarmedium";
	txtResultTitle.color = "#e0eaf3";
	txtResultTitle.text = textResultTitle;
	txtResultTitle.textAlign = "center";
	txtResultTitle.textBaseline='alphabetic';
	txtResultTitle.x = canvasW/2;
	txtResultTitle.y = canvasH/100 * 35;
	
	txtResultScore = new createjs.Text();
	txtResultScore.font = "120px bazarmedium";
	txtResultScore.color = "#ffffff";
	txtResultScore.text = '54';
	txtResultScore.textAlign = "center";
	txtResultScore.textBaseline='alphabetic';
	txtResultScore.x = canvasW/2;
	txtResultScore.y = canvasH/100 * 53;
	
	txtShare = new createjs.Text();
	txtShare.font = "40px bazarmedium";
	txtShare.color = "#e9cb9b";
	txtShare.text = shareText;
	txtShare.textAlign = "center";
	txtShare.textBaseline='alphabetic';
	txtShare.x = txtResultScore.x;
	txtShare.y = canvasH/100 * 63;
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonGoogle = new createjs.Bitmap(loader.getResult('buttonGoogle'));
	
	centerReg(buttonFacebook);
	centerReg(buttonTwitter);
	centerReg(buttonGoogle);
	
	buttonFacebook.x = canvasW/100 * 40;
	buttonTwitter.x = canvasW/2;
	buttonGoogle.x = canvasW/100 * 60;
	buttonFacebook.y = canvasH/100 * 71;
	buttonTwitter.y = canvasH/100 * 71;
	buttonGoogle.y = canvasH/100 * 71;
	
	mainContainer.addChild(logo, buttonStart);
	gameContainer.addChild(trainContainer, scoreBoard, txtScore);
	resultContainer.addChild(bgResult, txtResultLevel, txtResultTitle, txtResultScore, txtShare, buttonFacebook, buttonTwitter, buttonGoogle, btnContinue);
	canvasContainer.addChild(background, mainContainer, selectContainer, gameContainer, editContainer, resultContainer);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
		
		var newExtraSpace = (extraSpace/2) * scalePercent;
		canvasContainer.x = 0 + newExtraSpace;
		canvasContainer.y = 0 + newExtraSpace;
	}
}

function centerContainer(obj){
	obj.x = (windowW/2) - ((canvasW * scalePercent)/2);
	obj.y = (windowH/2) - ((canvasH * scalePercent)/2);
}

function resizeCanvasItem(){
	centerContainer(canvasContainer);
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame(event);
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}