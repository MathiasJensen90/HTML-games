
let canvasContext;
let ballx = 200;
let bally = 300;
let speed = 10;
let speedballx = 10;
let speedbally = 10;
let canvas;

//ball
let ballRadius = 5;

//scores
let player1Score = 0;
let player2Score = 0;

const WINING_SCORE = 3;

let showWinscreen = false; 

//paddle
let paddle1x;
let paddle1y; 

//enemy paddle
let paddle2x;
let paddle2y;
let enemySpeed = 7;

//consts
const PADDLE_HEIGT = 60; 
const PADDLE_WIDTH = 8

//set the framerate for the game
let frameInterval = 30;


//reset everything
const reset = () => {
}

const ballreset = () => {

    if (player1Score >= WINING_SCORE || player2Score >= WINING_SCORE)
    {

        showWinscreen = true; 
    }
speedballx = -speedballx 
ballx = canvas.width/2
bally = canvas.height/2
}


window.onload = () =>  {
canvas = document.getElementById("gameCanvas");
canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = "black"; 
canvasContext.textAlign = "center"
canvasContext.fillRect(0,0, canvas.width, canvas.height); 

paddle2x = canvas.width - 10 - PADDLE_WIDTH/2;
paddle2y = canvas.height/2 -PADDLE_HEIGT/2; 

paddle1x = 5; 
paddle1y =  canvas.height/2 - PADDLE_HEIGT/2; 


//Main loop of the program
setInterval(() => {
    drawingShapes()
    movement()
}, 1000/frameInterval);

//used for controlling the paddle with mouse
canvas.addEventListener("mousemove", function(evt) {
    let mousePos = calculateMousePos(evt)
    paddle1y = mousePos.y - (PADDLE_HEIGT/2); 
})

//starting the game with mouseclick
canvas.addEventListener("mousedown", (evt) => {
    if (showWinscreen)
    {
        player1Score = 0;
        player2Score = 0; 
        showWinscreen = false; 
    }
} )


}

//calls all the functions that draws stuff to the screen
const drawingShapes = () => {

    canvasContext.fillStyle = "black"; 
    canvasContext.fillRect(0,0, canvas.width, canvas.height); 
    if (showWinscreen){
        canvasContext.fillStyle= "white";
    
        if(player1Score >= WINING_SCORE){
            canvasContext.fillText("Player 1 won", canvas.width/2, canvas.height/3);
        }
        else if (player2Score >= WINING_SCORE) {
            canvasContext.fillText("Player 2 won", canvas.width/2, canvas.height/3);
        }

        canvasContext.fillText("Click to continue", canvas.width/2, canvas.height/2);
        return; 
    }
    
           //drawing net
           for (let i = 0; i<canvas.height; i += 30){
            canvasContext.fillStyle= "white";
            canvasContext.fillRect(canvas.width/2- 1, i, 2, 20);
           }
    //drawing player paddle
    paddle(paddle1x, paddle1y, PADDLE_WIDTH, PADDLE_HEIGT, "white");

    //drawing opponent paddle
    paddle(paddle2x, paddle2y, PADDLE_WIDTH, PADDLE_HEIGT, "white");


    //drawing ball
    ball()

    //scores
    canvasContext.font = "20px Arial";
    canvasContext.fillText("Score: " + player1Score, 50, 25)
    canvasContext.fillText("Score: " + player2Score, canvas.width-50, 25)
}

const movement = () => {

    if (showWinscreen){
        return; 
    }

//AI paddle movement
computerMovement(); 

    ballx += speedballx;
    bally += speedbally;
    /*if (paddle1x >= canvas.width-60 || paddle1x <= 0)
    {
        speed = -speed 
    }*/

    if (ballx >= canvas.width + ballRadius*3 ) 
    {
        player1Score++;
        ballreset(); 
        
    }
    else if (ballx <= 0 -ballRadius*3 ){
        player2Score++;
        ballreset(); 
        
    }
    if  (bally >= canvas.height-ballRadius || bally <= ballRadius*2)
    {
        speedbally = -speedbally 
    }

    //colssion with ball and paddle
    if (ballx <= PADDLE_WIDTH + paddle1x)
        if (bally > paddle1y
            && bally < paddle1y + PADDLE_HEIGT)
        {
         speedballx = -speedballx; 
         let deltaY = bally - (paddle1y+PADDLE_HEIGT/2);
         speedbally = deltaY * 0.35;
        }
    if (ballx >= paddle2x)
        if (bally > paddle2y
            && bally < paddle2y + PADDLE_HEIGT)
        {
         speedballx = -speedballx; 
         let deltaY = bally - (paddle2y+PADDLE_HEIGT/2);
         speedbally = deltaY * 0.35; 
        }

}

const paddle = (xpos, ypos, width, height, color) =>{
    canvasContext.fillStyle = color; 
    canvasContext.fillRect(xpos,ypos, width, height);
}

const ball = () => {
    canvasContext.fillStyle = "white"
    canvasContext.beginPath();
    canvasContext.arc(ballx, bally, ballRadius,0,Math.PI*2, true);
    canvasContext.fill()

}

//calculate where the mouse is, so it is only registrered when the mouse is inside the canvas
function calculateMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft; 
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }
}

// AI for paddle
const computerMovement = () => { 
    let paddle2yCenter = paddle2y + (PADDLE_HEIGT/2)
    if (bally-35 > paddle2yCenter){
        paddle2y += enemySpeed; 
    }
    else if (bally+35 < paddle2yCenter) {
        paddle2y -= enemySpeed;
    }
}

/*class Paddle {
    constructor(xpos, ypos,height, width, color){
        this.width = width
        this.height = height
        this.xpos = xpos
        this.ypos = ypos
        this.color = color
    }

     drawMe = () => {
        canvasContext.fillStyle = this.color; 
        canvasContext.fillRect(this.xpos,this.ypos, this.width, this.height);
    }
}*/