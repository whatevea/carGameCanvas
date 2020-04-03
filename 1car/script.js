import {Ball,randomColor,randomInt} from './objects.js';
//declaration of variables
const screen=document.getElementById('myCanvas').getContext('2d');
const height=screen.canvas.height;
const width=screen.canvas.width;
const leftSide=20;
const rightSide=350;
var currentPos=leftSide;
const clicked={onLeft:false,onRight:false};
var ballStartHeight=100;
//loading a image
const carPng=new Image();
carPng.src="imgs/car.png";
var ball1=new Ball(250,screen,ballStartHeight,20,randomColor());
var score=0;
var carSpeed=1;
var crashSound=document.getElementById('crashSound');

//Render everything
function render(){
	screen.clearRect(0,0,width,height); // clearing screen
	drawCar();
	fallingBalls();
	collisonDetection();
	ballDrops();
}
//Draw Car\
function drawCar() {
	screen.drawImage(carPng,currentPos,350,130,130);
	if(clicked.onLeft && currentPos<rightSide){
		currentPos+=carSpeed;
	}
	else if(clicked.onRight && currentPos>leftSide){
		currentPos-=carSpeed;
	}
	if(clicked.onLeft && currentPos==rightSide){
		clicked.onLeft=clicked.onRight=	false;
		score+=1;
	}
	if(clicked.onRight && currentPos==leftSide){
		clicked.onLeft=clicked.onRight=	false;
		score+=1;	
	}
}
//Falling Balls
function fallingBalls(){
ball1.draw();
ball1.increaseY();
}


//Collison Detection completed
function collisonDetection(){
var hitboxLeft=currentPos+40;
var hitboxRight=currentPos+130-43;
var ballLeftHitbox=ball1.xPos-ball1.radius;
var ballRightHitbox=ball1.radius+ball1.xPos;
var ballDownHitbox=ball1.radius+ball1.xPos;
if ((ball1.radius+ball1.yPos)>360 && ballRightHitbox>hitboxLeft && ballLeftHitbox<hitboxRight)
	{crashSound.play();ballDrops(true);
	 alert("OH NO ");
location.reload()
};
}

//OnClick move side
screen.canvas.addEventListener('click',()=>{
	if(currentPos==leftSide){clicked.onLeft=true;}
	if(currentPos==rightSide){clicked.onRight=true;}
})

//when a ball drops below
function ballDrops(reset=false){
if(ball1.yPos>480 || reset){
document.getElementById('coinDrop').play()
if(score>1 && score%5==0){carSpeed+=1};
if(reset){score=0};
reset=false;
ball1=new Ball(randomInt(40,400),screen,ballStartHeight,20,randomColor());
document.getElementById('score').innerText=score;
	document.body.style.backgroundColor=randomColor();	

	}
}

document.getElementById('startButton').addEventListener('click',()=>{
document.getElementById('startButton').style.display="none";
document.getElementById('myCanvas').style.display="block";
setInterval(render,10);})
