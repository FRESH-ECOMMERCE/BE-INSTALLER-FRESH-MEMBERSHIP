"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const startTime = Date.now();
const healthCheck = async (req, res) => {
    try {
        const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
        const data = {
            environment: process.env.NODE_ENV || 'development',
            uptime: `${uptimeInSeconds}s`,
            timestamp: process.uptime()
        };
        const response = response_util_1.ResponseData.success({ data });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, request_util_1.handleError)(res, serverError);
    }
};
exports.healthCheck = healthCheck;
