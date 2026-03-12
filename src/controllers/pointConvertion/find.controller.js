"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPointConvertion = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const pointConvertion_service_1 = require("../../services/pointConvertion/pointConvertion.service");
const findPointConvertion = async (_req, res) => {
    try {
        const pointConvertion = await pointConvertion_service_1.PointConvertionService.find();
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_util_1.ResponseData.success({
            data: pointConvertion,
            message: 'Point convertion fetched successfully'
        }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.findPointConvertion = findPointConvertion;
