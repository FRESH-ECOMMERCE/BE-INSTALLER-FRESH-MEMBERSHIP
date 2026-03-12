"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPointTransaction = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const pointTransaction_service_1 = require("../../services/pointTransaction/pointTransaction.service");
const createPointTransaction = async (req, res) => {
    const payload = req.body;
    try {
        const pointTransaction = await pointTransaction_service_1.PointTransactionService.create(payload);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response_util_1.ResponseData.success({
            data: pointTransaction,
            message: 'Point transaction created successfully'
        }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.createPointTransaction = createPointTransaction;
