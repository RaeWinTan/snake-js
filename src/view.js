 export class View{
   colourCode = {
  	0:"#FFFFFF",
  	1:"#000000",
  	2:"#FF0000"
  }
  constructor(n, cellSide){
    this.canvas = document.querySelector("#snakeGameId");
    this.cellSide = cellSide;
    this.canvas.width = n*cellSide;
    this.canvas.height = n*cellSide;
    this.ctx = this.canvas.getContext('2d');//canvasRenderingContext2d
  }

  //change white for those delete operations
  changeColour(pos, colourNum){
    this.ctx.fillStyle = this.colourCode[colourNum];
    this.ctx.fillRect(pos.y*this.cellSide, pos.x*this.cellSide, this.cellSide, this.cellSide);
  }

  clearCell(pos){
    this.ctx.clearRect(pos.y*this.cellSide, pos.x*this.cellSide, this.cellSide, this.cellSide);
    this.ctx.beginPath();
  }
}
