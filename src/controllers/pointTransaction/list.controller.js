"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPointTransactions = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const pointTransaction_service_1 = require("../../services/pointTransaction/pointTransaction.service");
const listPointTransactions = async (req, res) => {
    try {
        const payload = req.jwtPayload;
        const query = req.query;
        const result = await pointTransaction_service_1.PointTransactionService.findAll(query.page, query.size, payload.userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_util_1.ResponseData.success({ data: result }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.listPointTransactions = listPointTransactions;
