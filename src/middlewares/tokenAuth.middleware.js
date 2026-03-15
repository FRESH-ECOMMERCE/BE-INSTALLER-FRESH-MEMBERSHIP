"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenAuthorization = void 0;
const http_status_codes_1 = require("http-status-codes");
const crypto_1 = require("crypto");
const response_util_1 = require("../utils/response.util");
const configs_1 = require("../configs");
/**
 * Middleware for backend-to-backend authorization using a static Bearer token.
 * Expects header: Authorization: Bearer <BACKEND_API_TOKEN>
 */
const useTokenAuthorization = (req, res, next) => {
    const expectedToken = configs_1.appConfigs.secret.backendApiToken;
    if (expectedToken == null || expectedToken === '') {
        const message = 'Backend API token is not configured.';
        const response = response_util_1.ResponseData.error({ message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    const authHeader = req.headers.authorization;
    if (authHeader == null || !authHeader.startsWith('Bearer ')) {
        const message = 'Missing or invalid Authorization. Use: Bearer <token>.';
        const response = response_util_1.ResponseData.error({ message });
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
    }
    const token = authHeader.slice(7).trim();
    if (token.length === 0) {
        const message = 'Authorization token is empty.';
        const response = response_util_1.ResponseData.error({ message });
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
    }
    const expectedBuffer = Buffer.from(expectedToken, 'utf8');
    const actualBuffer = Buffer.from(token, 'utf8');
    if (expectedBuffer.length !== actualBuffer.length ||
        !(0, crypto_1.timingSafeEqual)(new Uint8Array(expectedBuffer), new Uint8Array(actualBuffer))) {
        const message = 'Invalid authorization token.';
        const response = response_util_1.ResponseData.error({ message });
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
    }
    next();
};
exports.useTokenAuthorization = useTokenAuthorization;
