"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBanner = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const banner_service_1 = require("../../services/banner/banner.service");
const createBanner = async (req, res) => {
    const payload = req.body;
    try {
        const banner = await banner_service_1.BannerService.create(payload);
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_util_1.ResponseData.success({ data: banner, message: 'Banner created successfully' }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.createBanner = createBanner;
