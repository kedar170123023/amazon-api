"use strict";

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("../src/config"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routers/userRoute"));

var _productRoute = _interopRequireDefault(require("./routers/productRoute"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

var connection = _mongoose["default"].connection;
connection.once("open", function () {
  return console.log("database connected");
});
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use("/api/users", _userRoute["default"]);
app.use("/api/products", _productRoute["default"]);
app.listen(_config["default"].PORT, function () {
  console.log("server runnning at port ".concat(_config["default"].PORT));
});
//# sourceMappingURL=server.js.map