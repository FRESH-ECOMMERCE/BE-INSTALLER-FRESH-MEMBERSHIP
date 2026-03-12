"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointTransactionIdParamSchema = exports.createPointTransactionSchema = exports.listPointTransactionsQuerySchema = void 0;
const zod_1 = require("zod");
exports.listPointTransactionsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).optional().default(1),
    size: zod_1.z.coerce.number().int().min(1).max(100).optional().default(10),
    userId: zod_1.z.coerce.number().int().positive().optional()
});
exports.createPointTransactionSchema = zod_1.z.object({
    pointTransactionMembershipCode: zod_1.z.string().min(1).max(255),
    pointTransactionPoint: zod_1.z.number().int().positive(),
    pointTransactionProductName: zod_1.z.string().optional(),
    pointTransactionProductPrice: zod_1.z.number().int().positive().optional(),
    pointTransactionStoreName: zod_1.z.string().optional(),
    pointTransactionType: zod_1.z.enum(['earn', 'redeem'])
});
exports.pointTransactionIdParamSchema = zod_1.z.object({
    pointTransactionId: zod_1.z.coerce.number().int().positive()
});
