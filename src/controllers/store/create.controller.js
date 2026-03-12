"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const store_service_1 = require("../../services/store/store.service");
const createStore = async (req, res) => {
    const payload = req.body;
    try {
        const store = await store_service_1.StoreService.create(payload);
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_util_1.ResponseData.success({ data: store, message: 'Store created successfully' }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.createStore = createStore;
