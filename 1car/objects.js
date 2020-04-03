export class Ball{
    constructor(xPos,screen,yPos,radius,color){
        this.xPos=xPos;
        this.screen=screen;
        this.yPos=yPos;
        this.radius=radius;
        this.color=color;
    }
    draw(){
    this.screen.beginPath();
    this.screen.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    this.screen.fillStyle=this.color;
    this.screen.fill();
    this.screen.closePath();
    }
    increaseY(){
    	this.yPos+=2; // increases the postion of the 

    }
}
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
export var randomColor = () =>{return '#'+Math.floor(Math.random()*16777215).toString(16)};
