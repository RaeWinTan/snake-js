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