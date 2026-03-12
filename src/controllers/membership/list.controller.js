"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMemberships = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const membership_service_1 = require("../../services/membership/membership.service");
const listMemberships = async (req, res) => {
    try {
        const query = req.query;
        const result = await membership_service_1.MembershipService.findAll(query.page, query.size, query.search);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_util_1.ResponseData.success({ data: result }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.listMemberships = listMemberships;
