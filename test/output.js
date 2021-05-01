(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _snake = require("./snake.js");

var _view = require("./view.js");

var _map = require("./map.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SnakeGame = /*#__PURE__*/function () {
  //pos (deault {x:Math.floor(Math.random() * n), y:Math.floor(Math.random() * n)})
  function SnakeGame() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      n: 10,
      refreshRate: 200,
      cellSide: 10
    };

    _classCallCheck(this, SnakeGame);

    this.option = option;
    this.defaultSetting();
    this.initGame();
    this.intervalId;
  }

  _createClass(SnakeGame, [{
    key: "endGame",
    value: function endGame() {
      var sgId = document.getElementById("snakeGameId");
      var deadId = document.getElementById("deadId");
      sgId.classList.toggle("notShow");
      sgId.classList.toggle("Show");
      deadId.classList.toggle("notShow");
      deadId.classList.toggle("Show");
      this.cleanUp();
    }
  }, {
    key: "cleanUp",
    value: function cleanUp() {
      clearInterval(this.intervalId);
    }
  }, {
    key: "defaultSetting",
    value: function defaultSetting() {
      if (!option.hasOwnProperty('n')) this.option.n = 10;
      if (!option.hasOwnProperty('refreshRate')) this.option.refreshRate = 200;
      if (!option.hasOwnProperty('cellSide')) this.option.cellSide = 10;

      if (!option.hasOwnProperty('pos')) {
        option.pos = {
          x: Math.floor(Math.random() * this.option.n),
          y: Math.floor(Math.random() * this.option.n)
        };
      } else {
        if (option.pos.x > this.option.n - 1 || this.option.pos.x < 0 || this.option.pos.y > this.option.n - 1 || this.option.pos.y < 0) {
          throw new Error("Start position out of range");
        }
      }
    }
  }, {
    key: "initGame",
    value: function initGame() {
      this.v = new _view.View(this.option.n, this.option.cellSide);
      this.s = new _snake.Snake(this.option.pos, this.option.n);
      this.m = new _map.Map(this.option.n, this.s, this.v);
      var sgId = document.getElementById("snakeGameId");
      var deadId = document.getElementById("deadId");
      sgId.classList.toggle("notShow");
      sgId.classList.toggle("Show");
      deadId.classList.toggle("notShow");
      deadId.classList.toggle("Show");
    }
  }, {
    key: "movement",
    value: function movement(keyBoard) {
      if (keyBoard === "up") this.m.up();
      if (keyBoard === "down") this.m.down();
      if (keyBoard === "left") this.m.left();
      if (keyBoard === "right") this.m.right();
    }
  }]);

  return SnakeGame;
}();

module.exports = {
  SnakeGame: SnakeGame
};
},{"./map.js":2,"./snake.js":3,"./view.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Map = /*#__PURE__*/function () {
  function Map(n, s, v) {
    _classCallCheck(this, Map);

    _defineProperty(this, "stopped", void 0);

    this.v = v;
    this.eaten = false;
    this.map = [];
    this.allPos = [];

    for (var i = 0; i < n; i++) {
      var row = [];

      for (var j = 0; j < n; j++) {
        this.allPos.push(s.convertPos({
          x: i,
          y: j
        }));

        if (s.getSnakePos().has(s.convertPos({
          x: i,
          y: j
        }))) {
          row.push(1);
          v.changeColour({
            x: i,
            y: j
          }, 1);
        } else row.push(0);
      }

      this.map.push(row);
    }

    this.s = s;
    this.n = n;
    this.stopped = 0;
    this.allPos = this.allPos.sort(function () {
      return Math.random() - 0.5;
    });
    this.generateFood();
  }

  _createClass(Map, [{
    key: "setFDiff",
    value: function setFDiff(a, b) {
      if (a.length === b.size) return -1;

      while (true) {
        if (!b.has(a[this.stopped++])) return a[this.stopped - 1];
        if (this.stopped >= a.length) this.stopped = 0;
      }
    } //can be faster...

  }, {
    key: "generateFood",
    value: function generateFood() {
      var num = this.setFDiff(this.allPos, this.s.getSnakePos());
      if (num === -1) throw "Position out of range";
      var coor = this.s.convertNum(num);
      this.map[coor[0]][coor[1]] = 2;
      this.v.changeColour({
        x: coor[0],
        y: coor[1]
      }, 2);
    }
  }, {
    key: "drawSnake",
    value: function drawSnake(delPos) {
      if (typeof delPos !== 'undefined') {
        this.map[delPos[0]][delPos[1]] = 0;
        this.v.clearCell({
          x: delPos[0],
          y: delPos[1]
        });
      }

      this.map[this.s.headCoor.x][this.s.headCoor.y] = 1;
      this.v.changeColour({
        x: this.s.headCoor.x,
        y: this.s.headCoor.y
      }, 1);
    } //movement stupp

  }, {
    key: "moveCleanUp",
    value: function moveCleanUp() {
      if (this.map[this.s.headCoor.x][this.s.headCoor.y] === 2) {
        this.s.moveEat({
          x: this.s.headCoor.x,
          y: this.s.headCoor.y
        });
        this.generateFood();
        this.drawSnake();
      } else {
        var difference = this.s.move(this.s.headCoor);
        var delPos = this.s.convertNum(difference);
        this.drawSnake(delPos);
      }
    }
  }, {
    key: "up",
    value: function up() {
      if (this.s.headCoor.x - 1 < 0) this.s.headCoor.x = this.n - 1;else --this.s.headCoor.x;
      this.moveCleanUp();
    }
  }, {
    key: "down",
    value: function down() {
      if (this.s.headCoor.x + 1 >= this.n) this.s.headCoor.x = 0;else ++this.s.headCoor.x;
      this.moveCleanUp();
    }
  }, {
    key: "right",
    value: function right() {
      if (this.s.headCoor.y + 1 >= this.n) this.s.headCoor.y = 0;else ++this.s.headCoor.y;
      this.moveCleanUp();
    }
  }, {
    key: "left",
    value: function left() {
      if (this.s.headCoor.y - 1 < 0) this.s.headCoor.y = this.n - 1;else --this.s.headCoor.y;
      this.moveCleanUp();
    }
  }]);

  return Map;
}();

exports.Map = Map;
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snake = void 0;

var _queue = require("@datastructures-js/queue");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//require('@datastructures-js/queue');
var Snake = /*#__PURE__*/function () {
  function Snake(pos, n) {
    _classCallCheck(this, Snake);

    this.snakeQ = new _queue.Queue();
    this.n = n;
    this.snakeQ.enqueue(this.convertPos(pos));
    this.snakePos = new Set([this.convertPos(pos)]);
    this.headCoor = pos;
  }

  _createClass(Snake, [{
    key: "moveEat",
    value: function moveEat(pos) {
      this.headCoor = pos;
      this.snakeQ.enqueue(this.convertPos(pos));
      this.snakePos.add(this.convertPos(pos));
    }
  }, {
    key: "convertPos",
    value: function convertPos(pos) {
      if (pos.x === 0) {
        return pos.y + 1;
      } else {
        return pos.x * this.n + pos.y + 1;
      }
    }
  }, {
    key: "convertNum",
    value: function convertNum(num) {
      if (num <= this.n) return [0, num - 1];else return num % this.n > 0 ? [parseInt(num / this.n), num % this.n - 1] : [num / this.n - 1, this.n - 1];
    }
  }, {
    key: "move",
    value: function move(pos) {
      //size also
      var rvalue = this.snakeQ.dequeue();
      this.snakePos["delete"](rvalue);
      if (this.snakePos.has(this.convertPos(pos))) throw new Error("DIED");
      this.snakeQ.enqueue(this.convertPos(pos));
      this.snakePos.add(this.convertPos(pos));
      return rvalue;
    }
  }, {
    key: "getSnakePos",
    value: function getSnakePos() {
      return this.snakePos;
    }
  }]);

  return Snake;
}();

exports.Snake = Snake;
},{"@datastructures-js/queue":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var View = /*#__PURE__*/function () {
  function View(n, cellSide) {
    _classCallCheck(this, View);

    _defineProperty(this, "colourCode", {
      0: "#FFFFFF",
      1: "#000000",
      2: "#FF0000"
    });

    this.canvas = document.querySelector("#snakeGameId");
    this.cellSide = cellSide;
    this.canvas.width = n * cellSide;
    this.canvas.height = n * cellSide;
    this.ctx = this.canvas.getContext('2d'); //canvasRenderingContext2d
  } //change white for those delete operations


  _createClass(View, [{
    key: "changeColour",
    value: function changeColour(pos, colourNum) {
      this.ctx.fillStyle = this.colourCode[colourNum];
      this.ctx.fillRect(pos.y * this.cellSide, pos.x * this.cellSide, this.cellSide, this.cellSide);
    }
  }, {
    key: "clearCell",
    value: function clearCell(pos) {
      this.ctx.clearRect(pos.y * this.cellSide, pos.x * this.cellSide, this.cellSide, this.cellSide);
      this.ctx.beginPath();
    }
  }]);

  return View;
}();

exports.View = View;
},{}],5:[function(require,module,exports){
//module.exports = require('./dist/index');
module.exports = require('./dist');

},{"./dist":1}],6:[function(require,module,exports){
const Queue = require('./src/queue');

exports.Queue = Queue;

},{"./src/queue":7}],7:[function(require,module,exports){
/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 *
 * @class
 */
class Queue {
  /**
   * Creates a queue.
   * @param {array} [elements]
   */
  constructor(elements) {
    this._elements = Array.isArray(elements) ? elements : [];
    this._offset = 0;
  }

  /**
   * Adds an element at the back of the queue.
   * @public
   * @param {any} element
   */
  enqueue(element) {
    this._elements.push(element);
    return this;
  }

  /**
   * Dequeues the front element in the queue.
   * @public
   * @returns {any}
   */
  dequeue() {
    if (this.size() === 0) return null;

    const first = this.front();
    this._offset += 1;

    if (this._offset * 2 < this._elements.length) return first;

    // only remove dequeued elements when reaching half size
    // to decrease latency of shifting elements.
    this._elements = this._elements.slice(this._offset);
    this._offset = 0;
    return first;
  }

  /**
   * Returns the front element of the queue.
   * @public
   * @returns {any}
   */
  front() {
    return this.size() > 0 ? this._elements[this._offset] : null;
  }

  /**
   * Returns the back element of the queue.
   * @public
   * @returns {any}
   */
  back() {
    return this.size() > 0 ? this._elements[this._elements.length - 1] : null;
  }

  /**
   * Returns the number of elements in the queue.
   * @public
   * @returns {number}
   */
  size() {
    return this._elements.length - this._offset;
  }

  /**
   * Checks if the queue is empty.
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * Returns the remaining elements in the queue as an array.
   * @public
   * @returns {array}
   */
  toArray() {
    return this._elements.slice(this._offset);
  }

  /**
   * Clears the queue.
   * @public
   */
  clear() {
    this._elements = [];
    this._offset = 0;
  }

  /**
   * Creates a shallow copy of the queue.
   * @public
   * @return {Queue}
   */
  clone() {
    return new Queue(this._elements.slice(this._offset));
  }

  /**
   * Creates a queue from an existing array.
   * @public
   * @static
   * @param {array} elements
   * @return {Queue}
   */
  static fromArray(elements) {
    return new Queue(elements);
  }
}

module.exports = Queue;

},{}],8:[function(require,module,exports){
s = require("snakegame");
let SnakeGame = s.SnakeGame;
var keyBoard = "up";
var btn = document.getElementById("startBtn");
btn.addEventListener("click", start);
document.addEventListener('keydown', fn);

function fn(e){
  if(e.key==="ArrowUp") keyBoard = "up";
  if(e.key==="ArrowDown") keyBoard = "down";
  if(e.key==="ArrowRight") keyBoard = "right";
  if(e.key==="ArrowLeft") keyBoard = "left";
}
start();
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

},{"snakegame":5}]},{},[8]);
