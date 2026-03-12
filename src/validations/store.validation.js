"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeIdParamSchema = exports.updateStoreSchema = exports.createStoreSchema = exports.listStoresQuerySchema = void 0;
const zod_1 = require("zod");
exports.listStoresQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).optional().default(1),
    size: zod_1.z.coerce.number().int().min(1).max(100).optional().default(10)
});
exports.createStoreSchema = zod_1.z.object({
    storeName: zod_1.z.string().min(1).max(255),
    storeLocation: zod_1.z.string().min(1).max(255)
});
exports.updateStoreSchema = zod_1.z.object({
    storeName: zod_1.z.string().min(1).max(255).optional(),
    storeLocation: zod_1.z.string().min(1).max(255).optional()
});
exports.storeIdParamSchema = zod_1.z.object({
    storeId: zod_1.z.coerce.number().int().positive()
});
