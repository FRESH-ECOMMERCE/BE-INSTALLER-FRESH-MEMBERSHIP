"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtPayloadSchema = void 0;
const zod_1 = require("zod");
exports.jwtPayloadSchema = zod_1.z
    .object({
    userId: zod_1.z.number().optional(),
    userName: zod_1.z.string().optional()
})
    .optional();
