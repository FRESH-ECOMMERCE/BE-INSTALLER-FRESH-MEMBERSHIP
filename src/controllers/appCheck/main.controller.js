"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const mainApp = async (req, res) => {
    try {
        const response = response_util_1.ResponseData.success({
            data: {
                aboutMe: 'Welcome to the API'
            },
            executionTime: res.locals.executionTime
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, request_util_1.handleError)(res, serverError);
    }
};
exports.mainApp = mainApp;
