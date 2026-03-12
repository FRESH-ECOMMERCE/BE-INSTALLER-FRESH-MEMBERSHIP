"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const auth_service_1 = require("../../services/auth/auth.service");
const jwt_util_1 = require("../../utils/jwt.util");
const userRegister = async (req, res) => {
    try {
        const payload = req.body;
        const user = await auth_service_1.AuthService.registerUser(payload);
        const accessToken = (0, jwt_util_1.generateAccessToken)({
            userId: user.userId,
            userName: user.userName
        });
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_util_1.ResponseData.success({ data: { accessToken } }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.userRegister = userRegister;
