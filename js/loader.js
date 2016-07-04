////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/background.png', id:'background'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/btnStart.png', id:'buttonStart'},
			{src:'assets/bgSelect.png', id:'bgSelect'},
			{src:'assets/bgSelectThumb.png', id:'bgSelectThumb'},
			{src:'assets/bgSelectThumbSelected.png', id:'bgSelectThumbSelected'},
			{src:'assets/btnSelect.png', id:'buttonSelect'},
			{src:'assets/btnArrow.png', id:'buttonArrow'},
			{src:'assets/scoreBoard.png', id:'scoreBoard'},
			{src:'assets/bgResult.png', id:'bgResult'},
			{src:'assets/btnContinue.png', id:'buttonContinue'},
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_google.png', id:'buttonGoogle'}];
			
	for(n=0;n<trains_arr.length;n++){
		manifest.push({src:trains_arr[n].src, id:'train'+n});
	}
	
	for(n=0;n<levels_arr.length;n++){
		manifest.push({src:levels_arr[n].thumb, id:'thumb_'+n});
		manifest.push({src:levels_arr[n].src, id:'map'+n});
	}
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/musicMain.ogg', id:'musicMain'})
		manifest.push({src:'assets/sounds/musicGame.ogg', id:'musicGame'})
		manifest.push({src:'assets/sounds/button.ogg', id:'soundButton'})
		manifest.push({src:'assets/sounds/score.ogg', id:'soundScore'})
		manifest.push({src:'assets/sounds/end.ogg', id:'soundEnd'})
		manifest.push({src:'assets/sounds/trainComing.ogg', id:'soundTrainComing'})
		manifest.push({src:'assets/sounds/trainBoost.ogg', id:'soundTrainBoost'})
		manifest.push({src:'assets/sounds/trainCrash.ogg', id:'soundTrainCrash'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}