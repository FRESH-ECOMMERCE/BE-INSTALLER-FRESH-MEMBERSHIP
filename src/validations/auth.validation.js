"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpSchema = exports.requestOtpSchema = exports.updatePasswordSchema = exports.registrationSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    userWhatsappNumber: zod_1.z.string().min(10).max(15),
    userPassword: zod_1.z.string().min(6)
});
exports.registrationSchema = zod_1.z.object({
    userName: zod_1.z.string().max(100).optional(),
    userWhatsappNumber: zod_1.z.string().min(10).max(15),
    userPassword: zod_1.z.string().min(6)
});
exports.updatePasswordSchema = zod_1.z.object({
    userWhatsappNumber: zod_1.z.string().min(10).max(15),
    userPassword: zod_1.z.string().min(6)
});
exports.requestOtpSchema = zod_1.z.object({
    userWhatsappNumber: zod_1.z.string().min(10).max(15),
    otpType: zod_1.z.enum(['register', 'reset'])
});
exports.verifyOtpSchema = zod_1.z.object({
    otpCode: zod_1.z.string().min(6).max(6)
});
