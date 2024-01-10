"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.addAdmin = exports.updateAdmin = exports.getAdminByID = exports.getAllAdmins = void 0;
const index_routes_1 = require("../../routes/index.routes");
const functions_1 = require("../functions/functions");
const getAllAdmins = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield index_routes_1.prismaClient.admin.findMany();
        res.send(admins);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.getAllAdmins = getAllAdmins;
const getAdminByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const adminFounded = yield index_routes_1.prismaClient.admin.findFirst({
            where: {
                id: Number(id),
            },
        });
        res.send(adminFounded);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.getAdminByID = getAdminByID;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { id } = req.params;
        const userUpdated = yield index_routes_1.prismaClient.user.update({
            where: {
                id: Number(id),
            },
            data,
        });
        (0, functions_1.successfullyMessage)(res, "Admin successfully updated", userUpdated);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.updateAdmin = updateAdmin;
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const newUser = yield index_routes_1.prismaClient.user.create({
            data,
            include: {
                permissions: true,
            },
        });
        res.send(newUser);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.addAdmin = addAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const userDeleted = yield index_routes_1.prismaClient.user.delete({
            where: { id },
        });
        (0, functions_1.successfullyMessage)(res, "Admin successfully deleted", userDeleted);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.deleteAdmin = deleteAdmin;
