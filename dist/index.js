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