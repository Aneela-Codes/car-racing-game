const Score = document.querySelector('.Score');
const StartScreen = document.querySelector('.Start-Screen');
const GameArea = document.querySelector('.Game-Area');

let player= {
    speed: 10,
    score : 0
};
//------------Starting the game-----------------
StartScreen.addEventListener('click', start);

//------------Ending the game-----------------
let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowRight : false,
    ArrowLeft : false
}

document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)


function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
   
    let car = document.querySelector('.car');
    let road = GameArea.getBoundingClientRect();
    // console.log(road
    if(keys.ArrowDown && player.y <road.bottom - 80){ player.y =player.y + player.speed; }

    if(keys.ArrowUp && player.y > road.top + 50){ player.y =player.y - player.speed; }

    if(keys.ArrowLeft && player.x >0){ player.x =player.x - player.speed; }

    if(keys.ArrowRight && player.x <road.width-50){ player.x = player.x + player.speed; }

    car.style.top = player.y + "px"
    car.style.left = player.x + "px"

}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(playerCar,enemyCar){
    playerCarRect = playerCar.getBoundingClientRect();
    enemyCarRect = enemyCar.getBoundingClientRect();
    return!((playerCarRect.bottom < enemyCarRect.top) ||(playerCarRect.top > enemyCarRect.bottom) 
    ||(playerCarRect.right < enemyCarRect.left) ||(playerCarRect.left > enemyCarRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines')
    lines.forEach(function(item) {
       
        if(item.y>700){

            item.y= item.y-750;
        }
        item.y =  item.y+ player.speed
        item.style.top = item.y +"px";
    });
   

}
function endGame(){
    player.start = false;
   StartScreen.classList.remove('hide');
   StartScreen.innerHTML = "Game Over! <br> Your Final Score is " + player.score;

}

function moveCars(car){
    let enemyCars = document.querySelectorAll('.enemyCar')

    enemyCars.forEach(function(item) {
       if(isCollide(car, item)){
           console.log('boom!')
           endGame();
       }

        if(item.y>700){

            item.y= -300;
            item.style.left=Math.floor(Math.random()*350) +"px";

        }
        item.y =  item.y+ player.speed
        item.style.top = item.y +"px";

    });
   

}
const playGame = ()=>{
    
    let car = document.querySelector('.car');
    let road = GameArea.getBoundingClientRect();
   if(player.start){

    moveLines();
    moveCars(car);
    if(keys.ArrowDown && player.y <road.bottom - 200){ player.y =player.y + player.speed; }

    if(keys.ArrowUp && player.y > road.top + 50){ player.y =player.y - player.speed; }

    if(keys.ArrowLeft && player.x >0){ player.x =player.x - player.speed; }

    if(keys.ArrowRight && player.x <road.width-50){ player.x = player.x + player.speed; }

    car.style.top = player.y + "px"
    car.style.left = player.x + "px"

    window.requestAnimationFrame(playGame)}
    player.score++;
    let ps = player.score -2;
    Score.innerHTML = `Score: ${ps}`;

}

function start(){
    player.start = true
    player.score = 0
//    GameArea.classList.remove('hide');
    StartScreen.classList.add('hide');
    GameArea.innerHTML = ""
    window.requestAnimationFrame(playGame)
    //Creating cars and lines dynamically

   for(let i =0 ; i<5; i++){                                //Using loop to create multiple lines
    let roadlines = document.createElement('div');
    roadlines.setAttribute('class', 'lines')
    roadlines.y = (i*150);
    roadlines.style.top =  roadlines.y + "px";
    GameArea.appendChild(roadlines)
   }
    
    let car = document.createElement('div');
    car.setAttribute('class', 'car')
    GameArea.appendChild(car)


    // Getting the position of car

    player.y = car.offsetTop;
    player.x = car.offsetLeft;

    //Creating Enemy Cars


    for(let i =0 ; i<3; i++){                                //Using loop to create multiple lines
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class', 'enemyCar')
    enemyCar.y = ((i+1)*350) * -1;
    enemyCar.style.top =  enemyCar.y + "px";
    enemyCar.style.backgroundColor=randomColor();
    enemyCar.style.left=Math.floor(Math.random()*350) +"px";
    GameArea.appendChild(enemyCar)
   }
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ("0" + String( hex)).substr(-2)
    }
    return "#" +c()+c()+c();
}