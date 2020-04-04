export function drawLines(screen)
{
screen.beginPath();       // Start a new path
screen.moveTo(63, 0);    // Move the pen to (30, 50)
screen.lineTo(63, 500);  // Draw a line to (150, 100)
screen.strokeStyle="#778de4"
screen.stroke();          // Render the path
//Middle line
screen.beginPath();       // Start a new path
screen.moveTo(126, 0);    // Move the pen to (30, 50)
screen.lineTo(126, 500);
screen.strokeStyle="#778de4"
screen.lineWidth=3;
screen.stroke();          // Render the path
//THrid line
screen.beginPath();       // Start a new path
screen.moveTo(189, 0);    // Move the pen to (30, 50)
screen.lineTo(189, 500);
screen.lineWidth=1;
screen.strokeStyle="#778de4"  // Draw a line to (150, 100)
screen.stroke();          // Render the path

}

export const redCarObj={
	x:0,
	leftX:0,
	rightX:65,
	y:400,
	goingLeft:false,
	goingRight:false
	}

export const blueCarObj={
	x:130,
	leftX:130,
	rightX:195,
	y:400,
	goingLeft:false,
	goingRight:false
}		


export function random(a,b){
	     if((Math.floor(Math.random() * (3 - 1) ) + 1)==1){
	     	return a
	     }
	     else {return b} 
}