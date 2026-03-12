"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipController = void 0;
const list_controller_1 = require("./list.controller");
const findByCode_controller_1 = require("./findByCode.controller");
exports.MembershipController = {
    listMemberships: list_controller_1.listMemberships,
    findMembershipByCode: findByCode_controller_1.findMembershipByCode
};
