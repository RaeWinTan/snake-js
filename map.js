export class Map{
	#stopped;
	constructor(n, s, v){
		this.v = v;
		this.eaten = false;
    this.map = [];
		this.allPos = [];
		for(var i = 0; i< n; i++){
      var row = [];
      for(var j = 0; j < n; j++){
				this.allPos.push(s.convertPos({x:i, y:j}));
				if (s.getSnakePos().has(s.convertPos({x:i, y:j}))){
					row.push(1);
					v.changeColour({x:i, y:j},1);
				}
        else row.push(0);
			}
      this.map.push(row);
		}
		this.s = s;
		this.n = n;
		this.#stopped = 0;
		this.allPos = this.allPos.sort(() => Math.random() - 0.5);
		this.generateFood();
	}

	setFDiff(a, b){
		if(a.length === b.size) return -1;
		while(true){
				if(!b.has(a[this.#stopped++])) return a[this.#stopped - 1];
				if(this.#stopped>=a.length) this.#stopped = 0;
		}
	}
	//can be faster...
	generateFood(){
		const num = this.setFDiff(this.allPos, this.s.getSnakePos());
		if(num === -1) return;
		const coor = this.s.convertNum(num);
		this.map[coor[0]][coor[1]] = 2;
		v.changeColour({x:coor[0], y:coor[1]}, 2);
	}

	drawSnake(delPos){
		if(typeof delPos !=='undefined'){
			this.map[delPos[0]][delPos[1]] = 0;
			this.v.clearCell({x:delPos[0],y:delPos[1]});
		}
		this.map[this.s.headCoor.x][this.s.headCoor.y] = 1
		this.v.changeColour({x:this.s.headCoor.x,y:this.s.headCoor.y},1);
	}


	//movement stupp
	moveCleanUp(){
		if(this.map[this.s.headCoor.x][this.s.headCoor.y] === 2){
			this.s.moveEat({x:this.s.headCoor.x, y:this.s.headCoor.y});
			this.generateFood();
			this.drawSnake();
		}else{
			var difference = this.s.move(this.s.headCoor);
			var delPos = this.s.convertNum(difference);
			this.drawSnake(delPos);
		}
	}

	up(){
		if (this.s.headCoor.x - 1 < 0) this.s.headCoor.x = this.n - 1;
		else --this.s.headCoor.x;
		this.moveCleanUp();
	}

	down(){
		if(s.headCoor.x + 1 >= this.n) s.headCoor.x = 0;
		else ++s.headCoor.x;
		this.moveCleanUp();
	}

	right(){
		if (s.headCoor.y + 1 >= this.n)s.headCoor.y = 0;
		else ++s.headCoor.y;
		this.moveCleanUp();
	}

	left(){
		if (s.headCoor.y - 1 < 0) s.headCoor.y = this.n - 1;
		else --s.headCoor.y;
		this.moveCleanUp();
	}
}
