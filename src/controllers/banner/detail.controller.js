"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBannerDetail = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const banner_service_1 = require("../../services/banner/banner.service");
const findBannerDetail = async (req, res) => {
    try {
        const bannerId = Number(req.params.bannerId);
        const banner = await banner_service_1.BannerService.findDetail(bannerId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_util_1.ResponseData.success({ data: banner }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.findBannerDetail = findBannerDetail;
