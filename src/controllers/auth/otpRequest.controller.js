"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("../../services/auth/auth.service");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const otpRequest = async (req, res) => {
    try {
        const payload = req.body;
        await auth_service_1.AuthService.requestOtp(payload);
        const response = response_util_1.ResponseData.success({ message: 'otp sent successfully' });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.otpRequest = otpRequest;
