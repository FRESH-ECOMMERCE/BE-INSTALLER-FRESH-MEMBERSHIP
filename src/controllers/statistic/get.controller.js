"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const statistic_service_1 = require("../../services/statistic/statistic.service");
const getStatistics = async (req, res) => {
    try {
        const _query = req.query;
        const data = await statistic_service_1.StatisticService.getStatistics();
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_util_1.ResponseData.success({ data, message: 'Statistics fetched successfully' }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.getStatistics = getStatistics;
