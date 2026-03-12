"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMyProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const myProfile_service_1 = require("../../services/myProfile/myProfile.service");
const findMyProfile = async (req, res) => {
    const payload = req.jwtPayload;
    try {
        const result = await myProfile_service_1.MyProfileService.findByUserId(payload.userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_util_1.ResponseData.success({ data: result }));
    }
    catch (err) {
        return (0, request_util_1.handleError)(res, err);
    }
};
exports.findMyProfile = findMyProfile;
