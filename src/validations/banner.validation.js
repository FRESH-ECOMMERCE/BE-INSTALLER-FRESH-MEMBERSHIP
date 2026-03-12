"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerIdParamSchema = exports.updateBannerSchema = exports.createBannerSchema = exports.listBannersQuerySchema = void 0;
const zod_1 = require("zod");
exports.listBannersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).optional().default(1),
    size: zod_1.z.coerce.number().int().min(1).max(100).optional().default(10)
});
exports.createBannerSchema = zod_1.z.object({
    bannerImage: zod_1.z.string().url(),
    bannerOrder: zod_1.z.number().int().positive()
});
exports.updateBannerSchema = zod_1.z.object({
    bannerImage: zod_1.z.string().url().optional(),
    bannerOrder: zod_1.z.number().int().positive().optional()
});
exports.bannerIdParamSchema = zod_1.z.object({
    bannerId: zod_1.z.coerce.number().int().positive()
});
