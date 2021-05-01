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