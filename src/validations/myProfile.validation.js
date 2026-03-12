"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfileSchema = exports.findDetailMyProfileSchema = exports.findMyProfileSchema = void 0;
const zod_1 = require("zod");
const jwtPayload_validation_1 = require("./jwtPayload.validation");
exports.findMyProfileSchema = zod_1.z.object({
    jwtPayload: jwtPayload_validation_1.jwtPayloadSchema
});
exports.findDetailMyProfileSchema = zod_1.z.object({
    jwtPayload: jwtPayload_validation_1.jwtPayloadSchema
});
exports.updateMyProfileSchema = zod_1.z.object({
    jwtPayload: jwtPayload_validation_1.jwtPayloadSchema,
    userName: zod_1.z.string().max(30).optional(),
    userPassword: zod_1.z.string().max(128).optional(),
    userWhatsappNumber: zod_1.z.string().optional()
});
