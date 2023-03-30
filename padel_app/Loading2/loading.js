var W = canvas.width;
var H = canvas.height;
var ballX = W/2;
var ballY = H/2;
var ballSpeedX = 10;
var ballSpeedY = 0;
var paddle1Y = 150;
var paddle2Y = 150;
var winningScreenShowed = false;
var stopped = false;
var requestId = 0;
var computerLevel = 9; //range 0 - 10

var playerScore = 0;
var computerScore = 0;

const WINNING_SCORE = 3;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

window.onload = function(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

  function loop(){
    if (!stopped) {
      moveEverything();
    	drawEverything();
    	requestId = window.requestAnimationFrame(loop);
		}
  }

  function start() {
    requestId = window.requestAnimationFrame(loop);
    stopped = false;
  }

  function stop() {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
    stopped = true;
  }

  start();

  canvas.addEventListener('mousemove', function(e){
    var mousePos = calculateMousePos(e);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
  });

  canvas.addEventListener('click', function(){
    if(!winningScreenShowed){
      return;
    }
    winningScreenShowed = false;
    playerScore = 0;
    computerScore = 0;
  });

  function getRadomNumber(min, max){
    return Math.random() * (max - min) + min;
  }

  function computerMovement(){
    var speed = Math.abs(ballSpeedY);
    if(speed>computerLevel){
       console.log(speed);
    }
    var indent = (speed > computerLevel) ? -10 :40;
    paddle2Y = ballY-indent;
  }

  function moveEverything(){
    if(winningScreenShowed){
      return;
    }
    var hitThePaddle1 = (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT);
    var hitThePaddle2 = (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT);
    computerMovement();
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX > W-20){
      if(hitThePaddle2){
      	ballSpeedX = -ballSpeedX;
      }else if(ballX > W){
				playerScore++;
	      resetBall();
      }
    }
    if(ballX < 20){
      if(hitThePaddle1){
      	ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle1Y + (PADDLE_HEIGHT/2));
        ballSpeedY = deltaY * 0.2;
      }else if(ballX < 0){
        computerScore++;
	      resetBall();
        stop();
        setTimeout(function(){
          start();
        }, 1000);
      }
    }
    if(ballY > H){
      ballSpeedY = -ballSpeedY;
    }
    if(ballY < 0){
      ballSpeedY = -ballSpeedY;
    }
};

  function drawNet(){
    for(var i = 0; i < H; i+=40){
      drawRect(W/2-1, i, 2, 20, 'white');
    }
  };

  function drawEverything(){
    drawRect(0, 0, W, H, 'black');
    drawNet();
    drawRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'green');
    drawRect(W-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'green');
    drawCircle(ballX, ballY, 5, 'red');
    if(winningScreenShowed){
      ctx.fillStyle = 'white';
      if(playerScore == WINNING_SCORE){
        ctx.fillText('You Won!', 100, 100);
      }else if(computerScore >= WINNING_SCORE){
      	ctx.fillText('Computer Won!', W-150, 100);
      }
      ctx.fillText('click to continue', 300, 310);
      return;
    }
    ctx.fillStyle = 'white';
    ctx.fillText(playerScore, 100, 100);
    ctx.fillText(computerScore, W-100, 100);
  }

  function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function drawCircle(x, y, rad, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2, false);
    ctx.fill();
  }

  function calculateMousePos(e){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    }
  }

  function resetBall(){
    if(playerScore == WINNING_SCORE || computerScore == WINNING_SCORE){
      winningScreenShowed = true;
    }
    ballX = W/2;
    ballY = H/2;
		ballSpeedY = 0;
    paddle2Y = 150;
    paddle1Y = 150;
  }
}