"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prismaClient = new client_1.PrismaClient();
exports.prismaClient = prismaClient;
const router = (0, express_1.Router)();
exports.router = router;
