"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isAuth = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    name: user.name
  }, _config["default"].JWT_SECRET, {
    expiresIn: '48h'
  });
};

exports.getToken = getToken;

var isAuth = function isAuth(req, res, next) {
  var token = req.headers.authorization;

  if (token) {
    // get token after Bearer
    var userToken = token.slice(7, token.length); // check token is valid

    _jsonwebtoken["default"].verify(userToken, _config["default"].JWT_SECRET, function (err, decode) {
      if (err) {
        return res.status(401).send({
          msg: 'invalid Token'
        });
      } // if token is valid


      console.log("token assigned to req.user ", decode);
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({
      msg: "Token is not supplied"
    });
  }
};

exports.isAuth = isAuth;

var isAdmin = function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }

  return res.status(401).send({
    msg: "Admin token not supplied"
  });
};

exports.isAdmin = isAdmin;
//# sourceMappingURL=util.js.map