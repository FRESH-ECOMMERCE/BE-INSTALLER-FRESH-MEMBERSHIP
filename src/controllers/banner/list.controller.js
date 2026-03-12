"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBanners = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const banner_service_1 = require("../../services/banner/banner.service");
const listBanners = async (req, res) => {
    try {
        const query = req.query;
        const result = await banner_service_1.BannerService.findAll(query.page, query.size);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_util_1.ResponseData.success({ data: result }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.listBanners = listBanners;
