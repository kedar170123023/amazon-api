"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    "default": 0
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
    "default": 0
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true,
    "default": 0
  },
  numReviews: {
    type: String,
    required: true,
    "default": 0
  }
});

var productModel = _mongoose["default"].model("Product", productSchema);

var _default = productModel;
exports["default"] = _default;
//# sourceMappingURL=productModel.js.map