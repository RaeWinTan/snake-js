import {Snake} from "./snake.js";
import {View} from "./view.js";
import {Map} from "./map.js";


const n = 500;
const pos = {x:3, y:3};
const v = new View(n);
const s = new Snake(pos, n);
const m = new Map(n, s, v);

const refreshRate = 1000/30;
var keyBoard = "up";

function fn(e){
	if(e.key==="ArrowUp") keyBoard = "up";
	if(e.key==="ArrowDown") keyBoard = "down";
	if(e.key==="ArrowRight") keyBoard = "right";
	if(e.key==="ArrowLeft") keyBoard = "left";
}

function movement(){
	if(keyBoard==="up") m.up();
	if(keyBoard==="down") m.down();
	if(keyBoard==="left") m.left();
	if(keyBoard==="right") m.right();
}
window.setInterval(() => {
	document.addEventListener('keydown', fn);
	movement();
}, refreshRate);
