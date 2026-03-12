"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMembershipByCodeParamSchema = exports.membershipIdParamSchema = exports.updateMembershipSchema = exports.createMembershipSchema = exports.listMembershipsQuerySchema = void 0;
const zod_1 = require("zod");
exports.listMembershipsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).optional().default(1),
    size: zod_1.z.coerce.number().int().min(1).max(100).optional().default(10),
    search: zod_1.z.string().optional().default('')
});
exports.createMembershipSchema = zod_1.z.object({
    membershipUserId: zod_1.z.number().int().positive()
});
exports.updateMembershipSchema = zod_1.z.object({
    membershipCode: zod_1.z.string().min(1).max(255).optional(),
    membershipPoint: zod_1.z.number().int().positive().optional(),
    membershipCategory: zod_1.z.enum(['gold', 'silver', 'platinum']).optional()
});
exports.membershipIdParamSchema = zod_1.z.object({
    membershipId: zod_1.z.coerce.number().int().positive()
});
exports.findMembershipByCodeParamSchema = zod_1.z.object({
    membershipCode: zod_1.z.string().min(1).max(255)
});
