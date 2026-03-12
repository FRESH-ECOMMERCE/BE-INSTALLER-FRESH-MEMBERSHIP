"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const auth_service_1 = require("../../services/auth/auth.service");
const userLogin = async (req, res) => {
    try {
        const payload = await auth_service_1.AuthService.loginUser(req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_util_1.ResponseData.success({ data: payload }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.userLogin = userLogin;
