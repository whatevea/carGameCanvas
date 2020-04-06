import {drawLines,redCarObj,blueCarObj,random} from './objects.js';
const crashAudio=document.getElementById('crashSound');
const scoreAudio=document.getElementById('scoreSound');
var score=0;
var interval;
const redCar=document.getElementById('redCar');
const blueCar=document.getElementById('blueCar');
const screen=document.getElementById('myCanvas').getContext("2d");
const carHeight=60;
const redCircle=document.getElementById('redCircle');
const blueCircle=document.getElementById('blueCircle');
const redBox=document.getElementById('redBox');
const blueBox=document.getElementById('blueBox');
const carSpeed=5;
var fallSpeed=3;
const leftFallingObjs=[{x:random(15,80),
visibility:true,
y:-30,
boxOrCircle:redBox,
},
{x:random(15,80),
y:-220,visibility:true,
boxOrCircle:redCircle,
}
, {x:random(15,80),
y:-410,visibility:true,
boxOrCircle:redBox,
}
];
const rightFallingObjs=[{x:random(142,207),
y:-40,visibility:true,
boxOrCircle:blueBox,
},
{x:random(142,207),
y:-230,visibility:true,
boxOrCircle:blueCircle,
}
, {x:random(142,207),
y:-420,visibility:true,
boxOrCircle:blueBox,
}
];

function runGameLoop(){
	screen.canvas.requestFullscreen();
	document.getElementById('startButton').style.display="none";
	screen.canvas.style.display="block";
 interval=setInterval(render,10);
}


//render function

function render(){
screen.clearRect(0,0,252,500);
leftObjFall();
rightObjFall();
drawLines(screen);
drawCar();	
moveCar(redCarObj);
moveCar(blueCarObj);
screen.fillText(score, 200, 20); 
}

function drawCar(){

screen.drawImage(redCar,redCarObj.x+10,redCarObj.y,carHeight-20,carHeight-5);
screen.drawImage(blueCar,blueCarObj.x+10,blueCarObj.y,carHeight-20,carHeight-5);
}






//Click Responder
screen.canvas.addEventListener('touchstart',(e)=>{
var middle=innerWidth/2;
//redcar
if(e.touches.length==1 && e.touches[0].clientX<middle){
MoveLeftCar();;

}
//blue car
if(e.touches.length==1 && e.touches[0].clientX>middle){
moveRightCar();
}
if(e.touches.length==2){
	moveRightCar();
	MoveLeftCar();
}
})

function MoveLeftCar(){
	if(redCarObj.x==redCarObj.leftX){
	redCarObj.goingRight=true;
}
if(redCarObj.x==redCarObj.rightX){
	
	redCarObj.goingLeft=true;
	
}
}
function moveRightCar(){
	if(blueCarObj.x==blueCarObj.leftX){
	blueCarObj.goingRight=true;
}
if(blueCarObj.x==blueCarObj.rightX){
	blueCarObj.goingLeft=true;
}
}

function moveCar(theCarObj){
	if (theCarObj.goingRight && theCarObj.x<theCarObj.rightX){
		theCarObj.x+=carSpeed;
	}
	if(theCarObj.goingLeft && theCarObj.x>theCarObj.leftX)
	{
		theCarObj.x-=carSpeed;
	}

	if(theCarObj.goingLeft && theCarObj.x==theCarObj.leftX){
		theCarObj.goingLeft=false;
	}
	if(theCarObj.goingRight && theCarObj.x==theCarObj.rightX){
		theCarObj.goingRight=false;
	}
}


//left objs falls
function leftObjFall(){
leftFallingObjs.forEach((item)=>{
	if(item.boxOrCircle==redCircle && item.y>480 && item.visibility){missedCircle()}
if(item.y>370 && redCarObj.x>35 && item.x==80 && item.y<450){collided(item)}
if(item.y>370 && redCarObj.x<30 && item.x==15 && item.y<450)  {collided(item)}
if(item.visibility){screen.drawImage(item.boxOrCircle,item.x,item.y,30,30);}
item.y+=fallSpeed;
if(item.y>500){
	item.visibility=true;
	item.y=-40
	item.boxOrCircle=random(redCircle,redBox); //this needs to be random as well.
	item.x==random(15,80);// needs to be random 
}})}
//right obj falls
function rightObjFall(){
rightFallingObjs.forEach((item)=>{
	if(item.boxOrCircle==blueCircle && item.y>480 && item.visibility){missedCircle()}
if(item.y>370 && blueCarObj.x<160 && item.x==142 && item.y<450){collided(item)}
if(item.y>370 && blueCarObj.x>160 && item.x==207 && item.y<450){collided(item)}
if(item.visibility){screen.drawImage(item.boxOrCircle,item.x,item.y,30,30);
}
item.y+=fallSpeed;
if(item.y>500){
	item.visibility=true;
	item.y=-40
	item.boxOrCircle=random(blueCircle,blueBox); //this needs to be random as well.
	item.x==random(142,207);// needs to be random 
}})}
//scores
function collided(item){

	if(item.boxOrCircle==redBox){clearInterval(interval); gameOver("You collided")} // gamee reset
	if(item.boxOrCircle==blueBox){clearInterval(interval); gameOver("You collided")}
	if(item.boxOrCircle==blueCircle && item.visibility){score+=1; updateScore();item.visibility=false;}
	 if(item.boxOrCircle==redCircle && item.visibility){score+=1; updateScore();item.visibility=false;}		 //updating score ,hideobj
	}
function updateScore(){
	scoreSound.play();
	screen.font = "30px Comic Sans MS";
screen.fillStyle = "white";
screen.textAlign = "center";
screen.fillText(score, 200,28); 
}

//if the circles are missed
function missedCircle(){
	clearInterval(interval);
	setTimeout(()=>{gameOver("You missed the circle")},1000)
}
function gameOver(text){
	crashSound.play();
alert(`${text} Your final score was ${score}`);
location.reload(); 
}

//
// gamerunningloop
document.getElementById('startButton').addEventListener("click",runGameLoop);
