var canvas;
        var canvasContext;
        
        console.log("hi....");
        var ballX=50;
        var ballY=150;
        var moveSpeedHorizontal =10;
        var moveSpeedVertical=5;
        
        var paddle2Y =250;
        var paddle1Y =250; 
        
        const PADDLE_HEIGHT =100;
        const PADDLE_THICKNESS=10;
        
        const WINNING_SCORE=3;
        var showingWinScreen = false; 
        
        var player1Score =0
        var player2Score =0;
        
        function calculateMousePos(evt){
            var rect =canvas.getBoundingClientRect();
            var root =document.documentElement;
            //
            var mouseX = evt.clientX -rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;
            
            //var mouseX = evt.clientX;
            //var mouseY = evt.clientY;
          
            return {
                 x:mouseX,
                 y:mouseY
            };
        }
        
                
        //to move the computer paddle according to ball
        // +35 and -35 is to avoid paddle's shaking
        function computerMovement(){
            var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
            if(paddle2YCenter > ballY+35)
                {
                    paddle2Y -= 6;
                } else if(paddle2YCenter < ballY-35)
                {    
                   paddle2Y += 6;
                }
            
        }
        
        //restart the game when click on screen  
        function handleMouseClick(evt){
            if(showingWinScreen){
                player1Score=0;
                player2Score=0;
                showingWinScreen = false;
            }
        }
        
          window.onload = function(){
               canvas = document.getElementById('firstcanvas');
               canvasContext= canvas.getContext('2d');
             
               var framespersecond=20;
              
               setInterval(callBoth, 1000/framespersecond);
              
              
              
              //
              canvas.addEventListener('mousedown',
                                      handleMouseClick);
              
              //set paddle's position value whenever mouse moves
              canvas.addEventListener('mousemove',
                                      function(evt){
                  var mousepos = calculateMousePos(evt);
                  paddle1Y = mousepos.y-(PADDLE_HEIGHT/2);
                  
              });
              
              
              
          }
        
          function callBoth(){
              moveFun();
              drawFun();
          }
          
        function resetBall(){
            if(player1Score >=3 || player2Score >=3 )
                {
                  
                  showingWinScreen = true;
                }
            ballX =canvas.width/2;
            ballY =canvas.height/2;
            moveSpeedHorizontal = -moveSpeedHorizontal; 
        }
        
        function moveFun(){
            if(showingWinScreen)
                {
                    return;
                }
            //to move the computer paddle according to ball
            computerMovement();
            
            ballX =ballX + moveSpeedHorizontal;
            ballY =ballY + moveSpeedVertical;
            
            // below lines check boundary values
            if(ballX < 0){
                //checks wheather ball hits left paddle or not
                if(ballY > paddle1Y && 
                   ballY < paddle1Y+PADDLE_HEIGHT){
                    //balls horizontal movement
                    moveSpeedHorizontal = -moveSpeedHorizontal;
                    //balls vertical movement
                    var delta =ballY - paddle1Y+(PADDLE_HEIGHT/2);
                    moveSpeedVertical = delta * 0.35;
                }else{
                     player2Score++; //must be before resetBall()
                      resetBall();
                     }
                     
            }
            if(ballX > canvas.width){
               if(ballY > paddle2Y && 
                 ballY < paddle2Y+PADDLE_HEIGHT){
               //ball horizontal movement        
                moveSpeedHorizontal = -moveSpeedHorizontal;
                //ball vertical movement   
               var delta =ballY - paddle2Y+(PADDLE_HEIGHT/2);
               moveSpeedVertical = delta * 0.35;
               }else {
                   player1Score++; // must be before resetBall()
                   resetBall();
               }
                
                
            }
            
            if(ballY < 0){
                moveSpeedVertical = -moveSpeedVertical;    
            }
            if(ballY > canvas.height){
                moveSpeedVertical = -moveSpeedVertical;
            }
            
        }
        
        function drawNet(){
            for(var i=0;i<=canvas.height;i+=40){
                colorRect(canvas.width/2-1,i,2,20,'white');                     }
        }
        
        function drawFun(){
        // next line blanks out the screen with black    
        colorRect(0,0,canvas.width,canvas.height,'black');
        
        if(showingWinScreen){
        canvasContext.fillStyle='white';
            
            if(player1Score >= WINNING_SCORE){
              canvasContext.fillText('HEY CONGRATS...YOU WON!',
                               300,100);  
            }else if(player2Score >= WINNING_SCORE){
                canvasContext.fillText('Opsss...YOU LOST!',
                               300,100);
            }          
            
            canvasContext.fillText('click to continue..',
                               500,350);
            return;
        }    
       
        drawNet();    
            
        // this is the left player paddle
        colorRect(0,paddle1Y,
                  PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
            
        // this is the right player paddle
        colorRect(canvas.width-PADDLE_THICKNESS,
                  paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
            
        // calling function to draw ball    
        colorCircle(ballX,ballY,10,'white');    
            
        // these lines draws circle as ball    
    /*    canvasContext.fillStyle='red';
        canvasContext.beginPath();
        canvasContext.arc(ballX,150,20,0,Math.PI*2,true);
        canvasContext.fill();    */
        
            
            //display scores 
            canvasContext.fillText(player1Score,100,100);
            canvasContext.fillText(player2Score,
                                   canvas.width-100,100);
       
        
        }
        
        // this function draws rectangle
        function colorRect(leftX,topY,width,height,drawColor){
            canvasContext.fillStyle=drawColor;
            canvasContext.fillRect(leftX,topY,width,height);
        
        }
        
        // this function draws circle 
        function colorCircle(centerX,centerY,radius,color){
            canvasContext.fillStyle=color;
            canvasContext.beginPath();
            canvasContext.arc(centerX,centerY,radius,0,
                                 Math.PI*2,true);
            canvasContext.fill();
        }
        $(document).ready(function() {
    
            loading();
          
          $('button').click(function(){
           loading();
          });
          
          
        });
        
        function loading(){
           $('button').hide();
          var num = 0;
            for(i=0; i<=100; i++) {
                setTimeout(function() { 
                    $('.loading span').html(num+'%');
                   
                    num++;
                  if(num==100){
                    $('button').show();
                  }
                },i*120);
            };
          
        }