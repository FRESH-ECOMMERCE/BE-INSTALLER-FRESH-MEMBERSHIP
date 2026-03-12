"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMembershipByCode = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_util_1 = require("../../utils/response.util");
const request_util_1 = require("../../utils/request.util");
const membership_service_1 = require("../../services/membership/membership.service");
const findMembershipByCode = async (req, res) => {
    try {
        const membershipCode = req.params.membershipCode;
        const membership = await membership_service_1.MembershipService.findByMembershipCode(membershipCode);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_util_1.ResponseData.success({ data: membership }));
    }
    catch (error) {
        return (0, request_util_1.handleError)(res, error);
    }
};
exports.findMembershipByCode = findMembershipByCode;
