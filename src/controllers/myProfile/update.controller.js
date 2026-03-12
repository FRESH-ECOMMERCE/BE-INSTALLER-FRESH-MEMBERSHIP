"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const myProfile_service_1 = require("../../services/myProfile/myProfile.service");
const updateMyProfile = async (req, res) => {
    const payload = req.body;
    try {
        await myProfile_service_1.MyProfileService.updateProfile(payload.jwtPayload.userId, {
            userName: payload.userName,
            userPassword: payload.userPassword,
            userWhatsappNumber: payload.userWhatsappNumber
        });
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_util_1.ResponseData.success({ message: 'Profile updated successfully' }));
    }
    catch (err) {
        return (0, request_util_1.handleError)(res, err);
    }
};
exports.updateMyProfile = updateMyProfile;
