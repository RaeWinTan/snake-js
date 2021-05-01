/*require("./snake");
require("./view");
require("./map");
*/


import {Snake} from "./snake.js";
import {View} from "./view.js";
import {Map} from "./map.js";

class SnakeGame{
//pos (deault {x:Math.floor(Math.random() * n), y:Math.floor(Math.random() * n)})
		constructor(option={n:10, refreshRate:200, cellSide : 10}){
			this.option = option;
			this.defaultSetting();
			this.initGame();
			this.intervalId;
		}


		endGame(){
			var sgId = document.getElementById("snakeGameId");
			var deadId = document.getElementById("deadId");
			sgId.classList.toggle("notShow");
			sgId.classList.toggle("Show");
			deadId.classList.toggle("notShow");
			deadId.classList.toggle("Show");
			this.cleanUp();
		}

		cleanUp(){
			clearInterval(this.intervalId);
		}
		defaultSetting(){
			if(!(option.hasOwnProperty('n'))) this.option.n = 10;
			if(!(option.hasOwnProperty('refreshRate'))) this.option.refreshRate = 200;
			if(!(option.hasOwnProperty('cellSide'))) this.option.cellSide = 10;
			if(!(option.hasOwnProperty('pos'))){
				option.pos = {x:Math.floor(Math.random() * this.option.n),y:Math.floor(Math.random() * this.option.n)};
			} else {
				if(option.pos.x > this.option.n -1  || this.option.pos.x < 0 ||this.option.pos.y > this.option.n - 1 || this.option.pos.y < 0){
					throw new Error("Start position out of range");
				}
			}
		}
		initGame(){
			this.v = new View(this.option.n, this.option.cellSide);
			this.s = new Snake(this.option.pos, this.option.n);
			this.m = new Map(this.option.n, this.s, this.v);
			var sgId = document.getElementById("snakeGameId");
			var deadId = document.getElementById("deadId");
			sgId.classList.toggle("notShow");
			sgId.classList.toggle("Show");
			deadId.classList.toggle("notShow");
			deadId.classList.toggle("Show");
		}

		movement(keyBoard){
			if(keyBoard==="up") this.m.up();
			if(keyBoard==="down") this.m.down();
			if(keyBoard==="left") this.m.left();
			if(keyBoard==="right") this.m.right();
		}
}


module.exports = {SnakeGame:SnakeGame};
