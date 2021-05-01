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