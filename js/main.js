////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////
var stageW=1024;
var stageH=768;
var extraSpace = 0;

/*!
 *
 * START BUILD GAME - This is the function that runs build game
 *
 */
function initMain(){
	if(!$.browser.mobile || !isTablet){
		$('#canvasHolder').show();
	}

	initGameCanvas(stageW,stageH);
	buildGameCanvas();
	buildGameButton();
	buildSelectPagination();

	if(editTrack){
		goPage('game');
	}else{
		goPage('main');
	}
	resizeCanvas();
}

var windowW=windowH=0;
var scalePercent=0;

/*!
 *
 * GAME RESIZE - This is the function that runs to resize and centralize the game
 *
 */
function resizeGameFunc(){
	setTimeout(function() {
		$('.mobileRotate').css('left', checkContentWidth($('.mobileRotate')));
		$('.mobileRotate').css('top', checkContentHeight($('.mobileRotate')));

		windowW = $(window).width();
		windowH = $(window).height();

		scalePercent = windowW/(stageW+extraSpace);

		if((stageH*scalePercent)>windowH){
			scalePercent = windowH/(stageH+extraSpace);
		}

		var gameCanvas = document.getElementById("gameCanvas");

		gameCanvas.width=(stageW+extraSpace)*scalePercent;
		gameCanvas.height=(stageH+extraSpace)*scalePercent;
		$('#canvasHolder').css('max-width',(stageW+extraSpace)*scalePercent);
		$('#canvasHolder').css('top',(windowH/2)-(((stageH+extraSpace)*scalePercent)/2));

		resizeCanvas();
	}, 100);
}
