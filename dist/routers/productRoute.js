"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _productModel["default"].find({});

          case 2:
            products = _context.sent;
            res.send(products);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/:id', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var productId, product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("data req", req.params.id);
            productId = req.params.id;
            _context2.next = 4;
            return _productModel["default"].findById({
              _id: productId
            });

          case 4:
            product = _context2.sent;

            if (product) {
              res.send(product);
            } else {
              res.status(404).send({
                message: "product not found"
              });
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var product, newProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            product = new _productModel["default"]({
              name: req.body.name,
              price: req.body.price,
              image: req.body.image,
              brand: req.body.brand,
              category: req.body.category,
              countInStock: req.body.countInStock,
              description: req.body.description
            });
            _context3.prev = 1;
            _context3.next = 4;
            return product.save();

          case 4:
            newProduct = _context3.sent;

            if (!newProduct) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(201).send({
              message: "New Product Created",
              data: newProduct
            }));

          case 7:
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(500).send({
              message: "Error in creating product"
            }));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var productId, product, updatedProduct;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            productId = req.params.id;
            _context4.next = 3;
            return _productModel["default"].findById(productId);

          case 3:
            product = _context4.sent;

            if (!product) {
              _context4.next = 22;
              break;
            }

            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            _context4.prev = 12;
            _context4.next = 15;
            return product.save();

          case 15:
            updatedProduct = _context4.sent;
            return _context4.abrupt("return", res.status(201).send({
              message: "Product Updated",
              data: updatedProduct
            }));

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](12);
            return _context4.abrupt("return", res.status(500).send({
              message: "error in updating product"
            }));

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[12, 19]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/:id', _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var productId, deletedProduct;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            productId = req.params.id;
            _context5.next = 3;
            return _productModel["default"].findById(productId);

          case 3:
            deletedProduct = _context5.sent;

            if (!deletedProduct) {
              _context5.next = 10;
              break;
            }

            _context5.next = 7;
            return deletedProduct.remove();

          case 7:
            res.send({
              message: "product deleted"
            });
            _context5.next = 11;
            break;

          case 10:
            res.send("error in deleteing ");

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=productRoute.js.map