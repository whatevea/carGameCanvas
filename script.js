//declaration of variables
const screen=document.getElementById('myCanvas').getContext('2d');
const height=screen.canvas.height;
const width=screen.canvas.width;
const leftSide=20;
const rightSide=350;
var currentPos=leftSide;
const clicked={onLeft:false,onRight:false};
var ballRadius=10;	
const fallSpeed=2;
var ballYpos=10;
//loading a image
const carPng=new Image();
carPng.src="imgs/car.png";
carPng.onload=()=>{
setInterval(render,10);}


//Render everything
function render(){
	screen.clearRect(0,0,width,height); // clearing screen
	drawCar();
	fallingBalls();
	collisonDetection();
}
//Draw Car\
function drawCar() {
	screen.drawImage(carPng,currentPos,350,130,130);
	if(clicked.onLeft && currentPos<rightSide){
		currentPos+=5;
	}
	else if(clicked.onRight && currentPos>leftSide){
		currentPos-=5;
	}
	if(clicked.onLeft && currentPos==rightSide){
		clicked.onLeft=clicked.onRight=	false;
	}
	if(clicked.onRight && currentPos==leftSide){
		clicked.onLeft=clicked.onRight=	false;	
	}
}
//Falling Balls
function fallingBalls(){
ball1=new Ball(250,screen).draw()

}


//Collison Detection
function collisonDetection(){
if (ballYpos>350 && currentPos>145 && currentPos<220){alert("collided")}
}

//OnClick move side
screen.canvas.addEventListener('click',()=>{
	if(currentPos==leftSide){clicked.onLeft=true;}
	if(currentPos==rightSide){clicked.onRight=true;}
})
//Ballconstruction
class Ball{
    constructor(xPos,screen){
        this.xPos=xPos;
        this.screen=screen;
    }
    draw(){
    this.screen.beginPath();
    this.screen.arc(this.xPos, ballYpos, ballRadius, 0, 2 * Math.PI);
    this.screen.stroke();
    ballYpos+=fallSpeed;

    }
   }

