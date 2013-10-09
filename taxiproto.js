//JavaScript Document

var circles = new Array();
var taxis = new Array();
var selectedTaxi = 4;
var fontPos = new Array();
var circlenum = 0;
var taxinum = 4;
var tmrSceneChange;
var tmrNewsItemsCycle;
var tmrMoveTaxis;
var currentNewsItem = 0;
var newsItems = 4;
var currentFunc = "";
var currentScreen = "Home";
var lastInteraction = 0;

$(document).ready(function() {
	startTimers();
});

function startTimers() {
	beginScene();
	cycleNewsItems();
	tmrUpdateScene = setInterval( updateScene, 20);
	tmrNewsItemsCycle = setInterval( cycleNewsItems, 5000);
	moveTaxis();
	tmrMoveTaxis = setInterval(moveTaxis, 20000);
	var d = new Date();
	lastInteraction = d.getTime();
	tmrResetSystem = setInterval(refreshSystem, 5000);
	
	$('#roadnames div').bind('click', function() {
		this.style.backgroundColor = "#fff";
	});
}

function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    }
	
function isOdd(num) { return num % 2;}

function refreshSystem() {
	var d = new Date();
	var time = d.getTime();
	if((time - lastInteraction) > 180000 /* 3 mins = 180000*/)
	{
		if(currentScreen != "Home") {
			changeScreen('Home', currentScreen);
		}
		lastInteraction = time;
	}
}

function changeScreen(screenName, oldScreen, currentFunction) {
	var d = new Date();
	lastInteraction = d.getTime();
	if(currentFunction != "" && currentFunction != undefined) currentFunc = currentFunction;
	$('.screen_active').addClass('screen');
	$('.screen_active').removeClass('screen_active');
	$('#screen_' + screenName).addClass('screen_active');
	$('#screen_' + screenName).removeClass('screen');
	
	$('#screen_' + screenName).fadeIn(600, function() { 
		$('#screen_' + oldScreen).fadeOut(600, function() { 
			$('.screen').css('display', 'none'); 
		});
	});
	
	if(screenName == 'TaxiMap')
	{
		if(currentFunc == 'Prebook')
		{
			$('#continue_fields').html('<a class="continue_btn" href="javascript:changeScreen(\'TakePayment\', \'TaxiMap\');" >Continue</a>');
		} else {
			$('#continue_fields').html('<a class="continue_btn" href="javascript:changeScreen(\'Home\', \'TaxiMap\');" style="background-image: none; text-align:center; padding-right: 10px;">Return Home</a>');
		}
	}
	if(screenName == 'Home')
	{
		currentFunc = "";
	}
	
	currentScreen = screenName;
}

function updatePrice(initcost) {
	var finalcost = (initcost * 100) + randomFromTo(5, 150);
	$('#finalcost').html('&pound;' + (finalcost / 100));
}

function moveTaxis() {
	for(i = 1; i <= taxinum; i++)
	{
		$('#taxi' + i).css('top', randomFromTo(160, 430) + 'px');
		$('#taxi' + i).css('left', randomFromTo(50, 600) + 'px');
		$('#taxi' + i + '_info').html('<div class="taxi_time">' + randomFromTo(2,12) + 'm</div><div class="taxi_num">No.' + randomFromTo(1, 50) + '</div>');
	}
}

function selectTaxi(taxi_id)
{
	$('#taxi' + selectedTaxi + '_info').css('z-index', (parseInt(selectedTaxi) + 1));
	$('#taxi' + selectedTaxi + '_info').removeClass('taxiselected');
	$('#taxi' + selectedTaxi + '_info').addClass('taxideselected');
	$('#taxi' + selectedTaxi).removeClass('taxi_active');
	$('#taxi' + selectedTaxi).addClass('taxi');
	selectedTaxi = taxi_id;
	$('#taxi' + taxi_id + '_info').css('z-index', '10');
	$('#taxi' + taxi_id + '_info').removeClass('taxideselected');
	$('#taxi' + taxi_id + '_info').addClass('taxiselected');
	$('#taxi' + taxi_id).addClass('taxi_active');
	$('#taxi' + taxi_id).removeClass('taxi');
}

function filterRoadChoices() {
	var query = $('#searchroad').val();
	$("#roadnames div").each(function(){		
		var found = this.innerHTML.toLowerCase().indexOf(query.toLowerCase());							  
		if(found == 1)
		{
			this.style.display = '';
		} else {
			this.style.display = 'none';
		}
    });
}

function cycleNewsItems() {
	$('#news'+ currentNewsItem ).fadeOut();
	currentNewsItem++;
	if(currentNewsItem > newsItems) currentNewsItem = 1;
	$('#news'+ currentNewsItem ).fadeIn();
}
	
function beginScene() {  
  var canvas = document.getElementById("adverts");  
  if (canvas.getContext) { 

	var ctx = canvas.getContext("2d");  
	
	ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );
	ctx.lineWidth = 1;
	circlenum = randomFromTo(5, 20);
	circles = new Array(circlenum);
	
	for(i = 0; i < circlenum; i++)
	{
		if(isOdd(i))
		{
			ctx.fillStyle   = '#8CA6DA';
		} else {
			ctx.fillStyle   = '#99A0AC';
		}
		circles[i] = new Array(2);
		circles[i][0] = randomFromTo(50, 430);
		circles[i][1] = randomFromTo(50, 250);
		circles[i][2] = randomFromTo(20, 50);
		
		ctx.beginPath();
		ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
	}

  }  
}

function beginScene2() {  
  var canvas = document.getElementById("adverts");  
  if (canvas.getContext) { 

	var ctx = canvas.getContext("2d");  
	
	ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );
	ctx.lineWidth = 1;
	
	fontSize = 60;
	fontPos[0] = 100;
	fontPos[1] = 100;
	
	ctx.font = 'bold ' + fontSize + 'px Arial';
	ctx.fillStyle = "#fff";
	ctx.fillText("dive in", 100, 100);
  }  
}

function updateScene2() {  
  var canvas = document.getElementById("adverts");  
  if (canvas.getContext) { 

	var ctx = canvas.getContext("2d");  
	
	ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );
	ctx.lineWidth   = 0;
	
	fontSize -= 0.2;
	fontPos[1] -= 0.2;
		
	if(fontSize < 0 || fontPos[1] < 0)
	{
		beginScene();
		clearInterval(tmrUpdateScene);
		tmrUpdateScene = setInterval( updateScene, 10);
		
	} else {
		
		ctx.font = 'bold ' + fontSize + 'px Arial';
		ctx.fillStyle = "#fff";
		ctx.fillText("dive in", fontPos[0], fontPos[1]);
		
	}
  }  
}  

function updateScene() {  
  var canvas = document.getElementById("adverts");  
  if (canvas.getContext) { 

	var ctx = canvas.getContext("2d");  
	
	ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );
	ctx.lineWidth   = 0;
	
	for(i = 0; i < circlenum; i++)
	{
		if(isOdd(i))
		{
			ctx.fillStyle   = '#8CA6DA';
		} else {
			ctx.fillStyle   = '#99A0AC';
		}
		circles[i][0] -= 0.2;
		circles[i][1] -= 0.2;
		
		if(circles[i][0] < 0 || circles[i][1] < 0 || circles[i][2] < 0)
		{
		
		beginScene2();
		clearInterval(tmrUpdateScene);
		tmrUpdateScene = setInterval( updateScene2, 20);
		
		} else {
		
		ctx.beginPath();
		ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		
		}
		
	}

  }  
}  
