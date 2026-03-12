"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStoreDetail = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const store_service_1 = require("../../services/store/store.service");
const findStoreDetail = async (req, res) => {
    try {
        const storeId = Number(req.params.storeId);
        const store = await store_service_1.StoreService.findDetail(storeId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_util_1.ResponseData.success({ data: store }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.findStoreDetail = findStoreDetail;
