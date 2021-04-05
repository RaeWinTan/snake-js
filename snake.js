//colour code
//0 is white
//1 is black
//2 is red
import {Queue} from '@datastructures-js/queue';

export class Snake{

	constructor(pos, n){
		this.snakeQ = new Queue();
		this.n = n;
		this.snakeQ.enqueue(this.convertPos(pos));
		this.snakePos = new Set([this.convertPos(pos)]);
		this.headCoor = pos;
	}

	moveEat(pos){
			this.headCoor = pos;
			this.snakeQ.enqueue(this.convertPos(pos));
			this.snakePos.add(this.convertPos(pos));
	}

	convertPos(pos){
		if (pos.x === 0){
			return pos.y+1;
		} else {
			return (pos.x)*this.n+pos.y + 1;
		}
	}

	convertNum(num){
		if(num <= this.n)	return [0, num-1];
		else return num%this.n > 0 ? [parseInt(num/this.n),num%this.n-1]:[num/this.n-1,this.n-1];
	}

	move(pos){
		//size also
		var rvalue = this.snakeQ.dequeue();
		this.snakePos.delete(rvalue);
		if(this.snakePos.has(this.convertPos(pos))){
			alert("DIED");
			throw "DIED";
		}
		this.snakeQ.enqueue(this.convertPos(pos));
		this.snakePos.add(this.convertPos(pos));

		return rvalue;
	}

	getSnakePos(){
		return this.snakePos;
	}
}
