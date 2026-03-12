"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertPointConvertion = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const pointConvertion_service_1 = require("../../services/pointConvertion/pointConvertion.service");
const upsertPointConvertion = async (req, res) => {
    const payload = req.body;
    try {
        await pointConvertion_service_1.PointConvertionService.createOrUpdate(payload);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_util_1.ResponseData.success({ message: 'Point convertion saved successfully' }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.upsertPointConvertion = upsertPointConvertion;
