"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../../controllers/user/userController");
const index_routes_1 = require("../index.routes");
// metodos
index_routes_1.router.get("/user", userController_1.getAllUsers);
index_routes_1.router.get("/user/:id", userController_1.getUserByID);
index_routes_1.router.patch("/user/updateUser", userController_1.updateUser);
index_routes_1.router.post("/user/newUser", userController_1.addUser);
index_routes_1.router.post("/user/deleteUser", userController_1.deleteUser);
index_routes_1.router.post("/permission/addPermision", userController_1.addPermision);
index_routes_1.router.post("/permission/deletePermission", userController_1.deletePermissionInUser);
index_routes_1.router.post("/user/makeAdmin", userController_1.makeAdmin);
index_routes_1.router.post("/user/deleteAdmin", userController_1.deleteAdmin);
exports.default = index_routes_1.router;
