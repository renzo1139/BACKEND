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
exports.deletePermissionInUser = exports.addPermision = exports.deleteUser = exports.deleteAdmin = exports.makeAdmin = exports.addUser = exports.updateUser = exports.getUserByID = exports.getAllUsers = void 0;
const index_routes_1 = require("../../routes/index.routes");
const functions_1 = require("../functions/functions");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield index_routes_1.prismaClient.user.findMany({
            include: {
                permissions: true,
            },
        });
        res.send(users);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userFounded = yield index_routes_1.prismaClient.user.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                permissions: true,
            },
        });
        res.send(userFounded);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.getUserByID = getUserByID;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { id } = req.params;
        const userUpdated = yield index_routes_1.prismaClient.user.update({
            where: {
                id: Number(id),
            },
            data,
        });
        (0, functions_1.successfullyMessage)(res, "User successfully updated", userUpdated);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.updateUser = updateUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.addUser = addUser;
const makeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const userUpdated = yield index_routes_1.prismaClient.user.update({
            where: {
                id: Number(id),
            },
            data: {
                role: "admin",
            },
        });
        (0, functions_1.successfullyMessage)(res, "User successfully updated", userUpdated);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.makeAdmin = makeAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const userUpdated = yield index_routes_1.prismaClient.user.update({
            where: {
                id: Number(id),
            },
            data: {
                role: "user",
            },
        });
        (0, functions_1.successfullyMessage)(res, "User successfully updated", userUpdated);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.deleteAdmin = deleteAdmin;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const userDeleted = yield index_routes_1.prismaClient.user.delete({
            where: { id },
        });
        (0, functions_1.successfullyMessage)(res, "User successfully deleted", userDeleted);
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.deleteUser = deleteUser;
const addPermision = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, permissionName } = req.body;
    try {
        const userFounded = yield index_routes_1.prismaClient.user.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                permissions: true, // Include current permissions
            },
        });
        if (userFounded) {
            // Disconnect all existing permissions
            const disconnectPermissions = userFounded.permissions.map((permission) => ({
                id: permission.id,
            }));
            // Create new permission
            const permissionCreated = yield index_routes_1.prismaClient.permission.create({
                data: {
                    name: permissionName,
                },
            });
            // Update user to disconnect old permissions and connect new one
            yield index_routes_1.prismaClient.user.update({
                where: {
                    id: Number(id),
                },
                data: {
                    permissions: {
                        disconnect: disconnectPermissions,
                        connect: {
                            id: permissionCreated.id,
                        },
                    },
                },
            });
            (0, functions_1.successfullyMessage)(res, "Permission successfully added", permissionCreated);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.addPermision = addPermision;
const deletePermissionInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, permissionName } = req.body;
    try {
        const userFounded = yield index_routes_1.prismaClient.user.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (userFounded) {
            const permission = yield index_routes_1.prismaClient.permission.findFirst({
                where: {
                    name: permissionName,
                },
            });
            if (permission) {
                const updatedUser = yield index_routes_1.prismaClient.user.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        permissions: {
                            disconnect: {
                                id: permission.id,
                            },
                        },
                    },
                });
                (0, functions_1.successfullyMessage)(res, "Permission successfully deleted from user", updatedUser);
            }
            else {
                res.status(404).json({ message: "Permission not found" });
            }
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        (0, functions_1.errorMessage)(res, error);
    }
});
exports.deletePermissionInUser = deletePermissionInUser;
