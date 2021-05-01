s = require("snakegame");
let SnakeGame = s.SnakeGame;
var keyBoard = "up";
var btn = document.getElementById("startBtn");
btn.addEventListener("click", start);
document.addEventListener('keydown', fn);
start();

function fn(e){
  if(e.key==="ArrowUp") keyBoard = "up";
  if(e.key==="ArrowDown") keyBoard = "down";
  if(e.key==="ArrowRight") keyBoard = "right";
  if(e.key==="ArrowLeft") keyBoard = "left";
}
function start(){
  post = {x:5,y:5};
  option = {pos:post};
  sg = new SnakeGame(option);
  sg.intervalId = window.setInterval(() => {
    try{
      sg.movement(keyBoard);
    } catch(err){
      if(err.message==="DIED"){
        sg.endGame();
      }
    }
  }, sg.option.refreshRate);

}
