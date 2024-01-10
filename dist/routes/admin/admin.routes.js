"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("../../controllers/admin/adminController");
const index_routes_1 = require("../index.routes");
// metodos
index_routes_1.router.get("/user", adminController_1.getAllAdmins);
index_routes_1.router.get("/user/:id", adminController_1.getAdminByID);
index_routes_1.router.patch("/user/updateUser", adminController_1.updateAdmin);
index_routes_1.router.post("/user/newUser", adminController_1.addAdmin);
index_routes_1.router.delete("/user/deleteUser", adminController_1.deleteAdmin);
exports.default = index_routes_1.router;
