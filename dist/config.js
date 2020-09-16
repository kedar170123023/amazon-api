"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// import dotenv from "dotenv";
// dotenv.config();
var _default = {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/KlickKart",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  PORT: process.env.PORT || 5000
};
exports["default"] = _default;
//# sourceMappingURL=config.js.map