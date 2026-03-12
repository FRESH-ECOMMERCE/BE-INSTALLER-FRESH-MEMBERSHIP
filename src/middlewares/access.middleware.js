"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthorization = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../utils/response.util");
const jwt_util_1 = require("../utils/jwt.util");
const request_util_1 = require("../utils/request.util");
const useAuthorization = (req, res, next) => {
    try {
        if (req.headers.authorization == null ||
            !req.headers.authorization.startsWith('Bearer ')) {
            const message = 'Missing Authorization.';
            const response = response_util_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const token = req.headers.authorization.split(' ')[1];
        const verify = (0, jwt_util_1.verifyAccessToken)(token);
        if (!verify) {
            const message = 'Invalid Authorization.';
            const response = response_util_1.ResponseData.error({ message });
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        req.jwtPayload = verify;
        next();
    }
    catch (serverError) {
        return (0, request_util_1.handleError)(res, serverError);
    }
};
exports.useAuthorization = useAuthorization;
