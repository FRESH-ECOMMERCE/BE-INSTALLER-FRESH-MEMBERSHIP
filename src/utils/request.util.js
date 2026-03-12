"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.handleServerError = handleServerError;
exports.handleError = handleError;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("./response.util");
const logger_service_1 = require("../services/logger/logger.service");
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    static notFound(message) {
        return new AppError(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static badRequest(message) {
        return new AppError(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static conflict(message) {
        return new AppError(message, http_status_codes_1.StatusCodes.CONFLICT);
    }
}
exports.AppError = AppError;
function handleServerError(res, err) {
    if (err instanceof Error) {
        const message = `Unable to process request!: ${err.message}`;
        logger_service_1.LoggerService.error(message, { stack: err.stack });
        const response = response_util_1.ResponseData.error({
            message: 'Unable to process request: ' + err.message
        });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    const message = 'Unable to process request! Unknown error';
    logger_service_1.LoggerService.error(message);
    const response = response_util_1.ResponseData.error({ message: 'Unable to process request!' });
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}
function handleError(res, err) {
    if (err instanceof AppError) {
        logger_service_1.LoggerService.warn(`[AppError] ${err.statusCode}: ${err.message}`);
        return res.status(err.statusCode).json(response_util_1.ResponseData.error({ message: err.message }));
    }
    return handleServerError(res, err);
}
