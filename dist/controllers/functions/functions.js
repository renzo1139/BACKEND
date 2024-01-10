"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successfullyMessage = exports.errorMessage = void 0;
const errorMessage = (res, error) => {
    return res.status(404).json({
        message: "Error",
        error,
    });
};
exports.errorMessage = errorMessage;
const successfullyMessage = (res, message, data) => {
    return res.status(200).json({
        message,
        data,
    });
};
exports.successfullyMessage = successfullyMessage;
