"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleWares = void 0;
const access_middleware_1 = require("./access.middleware");
const cross_middleware_1 = require("./cross.middleware");
const logger_middleware_1 = require("./logger.middleware");
const tokenAuth_middleware_1 = require("./tokenAuth.middleware");
const validation_middleware_1 = require("./validation.middleware");
exports.MiddleWares = {
    useAuthorization: access_middleware_1.useAuthorization,
    useTokenAuthorization: tokenAuth_middleware_1.useTokenAuthorization,
    loggerMidleWare: logger_middleware_1.loggerMidleWare,
    corsOrigin: cross_middleware_1.corsOrigin,
    validate: validation_middleware_1.validate
};
