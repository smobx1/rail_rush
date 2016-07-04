////////////////////////////////////////////////////////////
// EDIT TRACKS
////////////////////////////////////////////////////////////
var editData = {railNum:0, railPath:[]};
var editShape;
var addNum = 0;
var dotWidth = 8;
var colourCurve = 'yellow';
var colourDot = 'green';
var colourStart = 'orange';
var colourEnd = 'red';
var editDot;
var colourEdit = '#00ff00';

/*!
 * 
 * EDIT READY
 * 
 */
$(function() {
	editTrack = true;
	extraSpace = 200;
	resizeGameFunc();
});

function loadEditPage(){
	$.get('editTools.html', function(data){
		$('body').prepend(data);
		buildEditButtons();
		buildEditMode();
		loadMaps();
	});		
}

/*!
 * 
 * BUILD EDIT BUTTONS - This is the function that runs to build edit buttons
 * 
 */
function buildEditButtons(){
	gameData.map = 0;
	buildDropdown();
	selectRailPath();
	
	$('#add').click(function(){
		addDot();
	});
	
	$('#addselected').click(function(){
		addDot(true);
	});
	
	$('#remove').click(function(){
		removeDot();
	});
	
	$('#test').click(function(){
		testRun();
	});
	
	$('#testAll').click(function(){
		testRunAll();
	});
	
	$('#testStop').click(function(){
		stopTestRun();
	});
	$('#testStop').hide();
	
	$( "#tweenSpeed" ).change(function() {
		updateMaps();
	});
	$( "#tweenDelay" ).change(function() {
		updateMaps();
	});	

	$('#generate').click(function(){
		var output = '';
		for(n=0;n<editData.railPath.length;n++){
			output += '{x:'+editData.railPath[n].x+', y:'+editData.railPath[n].y+'}, ';
		}
		$('#output').val('{speed:'+Number($('#tweenSpeed').val())+',delay:'+Number($('#tweenDelay').val())+',path:['+output+']},');
	});
	
	$('#remove').hide();
	$('#editWrapper').show();
	
	$("#levellists").change(function() {
		if($(this).val() != ''){
			gameData.map = $(this).val();
			buildDropdown();
			selectRailPath();
			loadMaps();
			buildEditMode();
		}
	});
	
	$("#raillists").change(function() {
		if($(this).val() != ''){
			editData.railNum = $(this).val();
			selectRailPath();
			buildEditMode();
		}
	});
}

/*!
 * 
 * BUILD DROPDOWN - This is the function that runs to build dropdown
 * 
 */
function buildDropdown(){
	$('#levellists').empty();
	for(n=0;n<levels_arr.length;n++){
		$('#levellists').append($("<option/>", {
			value: n,
			text: 'Level '+(n+1)
		}));
	}
	
	$('#levellists').val(gameData.map);
	
	editData.railNum = 0;
	$('#raillists').empty();
	for(n=0;n<levels_arr[gameData.map].rails.length;n++){
		$('#raillists').append($("<option/>", {
			value: n,
			text: 'Rail '+(n+1)
		}));
	}
}

function selectRailPath(){
	editData.railPath = levels_arr[gameData.map].rails[editData.railNum].path;
	
	$('#tweenSpeed').val(levels_arr[gameData.map].rails[editData.railNum].speed)
	$('#tweenDelay').val(levels_arr[gameData.map].rails[editData.railNum].delay)
}

/*!
 * 
 * BUILD EDIT MODE - This is the function that runs to build edit mode
 * 
 */
function buildEditMode(){
	scoreBoard.visible = false;
	txtScore.visible = false;
	
	editDot = new createjs.Shape();
	editDot.alpha = .5;
	editDot.graphics.beginFill(colourEdit).drawCircle(0, 0, dotWidth+5);
	editDot.visible = false;
	editShape = new createjs.Shape();
	
	resetEditStage();
	drawDots();
	redrawEdit();
}

/*!
 * 
 * RESET STAGE - This is the function that runs to reset stage
 * 
 */
function resetEditStage(){
	editContainer.removeAllChildren();
	editContainer.addChild(editDot, editShape);
}

/*!
 * 
 * REDRAW POINT - This is the function that runs to redraw point
 * 
 */
function redrawEdit(){
	editShape.graphics.clear();
	
	if(editData.railPath.length > 0){
		editShape.graphics.beginStroke("red").moveTo(editData.railPath[0].x, editData.railPath[0].y);
		for(n=0;n<editData.railPath.length;n++){
			if(editData.railPath.length - n > 2 && isEven(n)){
				editShape.graphics.curveTo(editData.railPath[n+1].x, editData.railPath[n+1].y, editData.railPath[n+2].x, editData.railPath[n+2].y);
			}
		}
	}
	
	updateMaps();
}

/*!
 * 
 * ADD POINT - This is the function that runs to add point
 * 
 */
function addDot(con){
	if(con){
		var pointNum = editPointNum;
		if(isEven(editPointNum)){
			pointNum++;
		}
		editData.railPath.splice(pointNum, 0, {x:$('#newpointX').val(), y:$('#newpointY').val()},{x:$('#newcurvepointX').val(), y:$('#newcurvepointY').val()});
	}else{
		if(editData.railPath.length == 0){
			editData.railPath = [{x:631, y:405}, {x:$('#newpointX').val(), y:$('#newpointY').val()},{x:$('#newcurvepointX').val(), y:$('#newcurvepointY').val()}];
		}else{
			editData.railPath.push({x:$('#newpointX').val(), y:$('#newpointY').val()},{x:$('#newcurvepointX').val(), y:$('#newcurvepointY').val()});
		}
	}
	
	resetEditStage();
	drawDots();
	redrawEdit();
}

/*!
 * 
 * DRAW ALL POINTS - This is the function that runs to draw all points
 * 
 */
function drawDots(){
	addNum=0;
	for(n=0;n<editData.railPath.length;n++){
		drawDot(n, editData.railPath[n].x, editData.railPath[n].y);
		addNum++;
	}
}

/*!
 * 
 * DRAW SINGLE POINT - This is the function that runs to draw single point
 * 
 */
function drawDot(n,x,y){
	var circle = new createjs.Shape();
	var colourCheckDot = isEven(n) == true ? colourDot : colourCurve;
	colourCheckDot = n == 0 ? colourStart : colourCheckDot;
	colourCheckDot = n == editData.railPath.length-1 ? colourEnd : colourCheckDot;
	
	circle.graphics.beginFill(colourCheckDot).drawCircle(0, 0, dotWidth);
	circle.x = x;
	circle.y = y;
	editContainer.addChild(circle);
	
	circle.cursor = "pointer";
	circle.name = n;
	circle.addEventListener("mousedown", function(evt) {
		toggleDragEvent(evt, 'drag')
	});
	circle.addEventListener("pressmove", function(evt) {
		toggleDragEvent(evt, 'move')
	});
	circle.addEventListener("pressup", function(evt) {
		toggleDragEvent(evt, 'drop')
	});
}

/*!
 * 
 * POINT EVENT - This is the function that runs to for point event handler
 * 
 */
function toggleDragEvent(obj, con){
	switch(con){
		case 'drag':
			obj.target.offset = {x:obj.target.x-(obj.stageX / scalePercent), y:obj.target.y-(obj.stageY / scalePercent)};
			obj.target.alpha = .5;
			toggleEditDot(obj.target.x, obj.target.y, obj.target.name);
		break;
		
		case 'move':
			obj.target.alpha = .5;
			obj.target.x = (obj.stageX / scalePercent) + obj.target.offset.x;
			obj.target.y = (obj.stageY / scalePercent) + obj.target.offset.y;
			toggleEditDot(obj.target.x, obj.target.y, obj.target.name);
			
			editData.railPath[obj.target.name].x = Math.round(obj.target.x);
			editData.railPath[obj.target.name].y = Math.round(obj.target.y);
			
			redrawEdit();
		break;
		
		case 'drop':
			obj.target.alpha = 1;
		break;
	}
}

/*!
 * 
 * TOGGLE EDIT POINT - This is the function that runs to toggle edit point
 * 
 */
var editPointNum = -1;
function toggleEditDot(x, y, name){
	editDot.x = x;
	editDot.y = y;
	editDot.visible = true;
	$('#remove').show();
	$('.addSelected').show();
	editPointNum = name;
}

/*!
 * 
 * REMOVE POINT - This is the function that runs to remove selected point
 * 
 */
function removeDot(){
	var pointNum = editPointNum;
	if(isEven(editPointNum)){
		pointNum--;
	}
	
	editData.railPath.splice(pointNum, 2);
	editDot.visible = false;
	$('#remove').hide();
	$('.addSelected').hide();
	
	resetEditStage();
	drawDots();
	redrawEdit();
}

/*!
 * 
 * TEST RUN - This is the function that runs to test run
 * 
 */
function testRun(){
	removeAllTrains();
	createNewTrain(editData.railNum);
	$('#testStop').show();
}

function testRunAll(){
	removeAllTrains();
	
	for(n=0;n<levels_arr[gameData.map].rails.length;n++){
		createNewTrain(n);
	}
	$('#testStop').show();
}

function stopTestRun(){
	removeAllTrains();
	$('#testStop').hide();
}

/*!
 * 
 * UPDATE MAPS - This is the function that runs update maps
 * 
 */
function updateMaps(){
	levels_arr[gameData.map].rails[editData.railNum].path = editData.railPath;
	levels_arr[gameData.map].rails[editData.railNum].speed = $('#tweenSpeed').val();
	levels_arr[gameData.map].rails[editData.railNum].delay = $('#tweenDelay').val();
}