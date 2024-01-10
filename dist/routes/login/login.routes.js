"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginController_1 = require("../../controllers/login/loginController");
const index_routes_1 = require("../index.routes");
index_routes_1.router.post("/login", loginController_1.loginService);
exports.default = index_routes_1.router;
