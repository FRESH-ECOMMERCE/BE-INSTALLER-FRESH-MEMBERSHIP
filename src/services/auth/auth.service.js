"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const logger_service_1 = require("../logger/logger.service");
const request_util_1 = require("../../utils/request.util");
const jwt_util_1 = require("../../utils/jwt.util");
const hash_util_1 = require("../../utils/hash.util");
const user_model_1 = require("../../models/user.model");
const membership_service_1 = require("../membership/membership.service");
const redis_1 = require("../../configs/redis");
const configs_1 = require("../../configs");
const axios_1 = __importDefault(require("axios"));
class AuthService {
    static async loginUser(payload) {
        const { userWhatsappNumber, userPassword } = payload;
        const user = await user_model_1.UserModel.findOne({
            where: {
                userWhatsappNumber
            }
        });
        if (user == null) {
            const message = 'Account not found. Please register first!';
            logger_service_1.LoggerService.info(`[AuthService]: Login attempt failed: ${message}`);
            throw request_util_1.AppError.notFound(message);
        }
        const isPasswordValid = (0, hash_util_1.hashPassword)(userPassword) === user.userPassword;
        if (!isPasswordValid) {
            const message = 'Invalid whatsapp number and password combination!';
            logger_service_1.LoggerService.error(`[AuthService]: Login attempt failed: ${message}`);
            throw new request_util_1.AppError(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const token = (0, jwt_util_1.generateAccessToken)({
            userId: user.userId,
            userName: user.userName
        });
        logger_service_1.LoggerService.info(`[AuthService]: User ${user.userName} logged in successfully`);
        return {
            accessToken: token,
            refreshToken: ''
        };
    }
    static async registerUser(payload) {
        const validatedData = {
            userName: payload.userName ?? '',
            userWhatsappNumber: payload.userWhatsappNumber,
            userPassword: payload.userPassword
        };
        const existingUser = await user_model_1.UserModel.findOne({
            where: {
                userWhatsappNumber: { [sequelize_1.Op.eq]: validatedData.userWhatsappNumber }
            }
        });
        if (existingUser != null) {
            const message = `Whatsapp number ${existingUser.userWhatsappNumber} sudah terdaftar, gunakan yang lain`;
            logger_service_1.LoggerService.info(`[AuthService]: Registration attempt failed: ${message}`);
            throw request_util_1.AppError.badRequest(message);
        }
        validatedData.userPassword = (0, hash_util_1.hashPassword)(validatedData.userPassword ?? '');
        const user = await user_model_1.UserModel.create(validatedData);
        await membership_service_1.MembershipService.create({
            membershipUserId: user.userId
        });
        return {
            userId: user.userId,
            userWhatsappNumber: user.userWhatsappNumber,
            userName: user.userName
        };
    }
    static async updateUserPassword(payload) {
        const { userPassword, userWhatsappNumber } = payload;
        const user = await user_model_1.UserModel.findOne({
            where: {
                userWhatsappNumber
            }
        });
        if (user == null) {
            const message = 'User not found!';
            logger_service_1.LoggerService.info('[AuthService]: Attempt to update non-existing user');
            throw request_util_1.AppError.notFound(message);
        }
        const updatedData = {
            ...(userPassword && { userPassword: (0, hash_util_1.hashPassword)(userPassword) })
        };
        await user_model_1.UserModel.update(updatedData, {
            where: {
                userId: user.userId
            }
        });
        logger_service_1.LoggerService.info('[AuthService]: Password updated successfully');
    }
    static async requestOtp(payload) {
        const { userWhatsappNumber, otpType } = payload;
        const existingUser = await user_model_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userWhatsappNumber: { [sequelize_1.Op.eq]: userWhatsappNumber }
            }
        });
        if (otpType === 'reset' && existingUser === null) {
            const message = `whatsapp number ${userWhatsappNumber} is not registered.`;
            logger_service_1.LoggerService.info(`Registration attempt failed: ${message}`);
            throw request_util_1.AppError.badRequest(message);
        }
        if (otpType === 'register' && existingUser != null) {
            const message = `whatsapp number ${userWhatsappNumber} sudah terdaftar, gunakan yang lain`;
            logger_service_1.LoggerService.info(`Registration attempt failed: ${message}`);
            throw request_util_1.AppError.badRequest(message);
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const minutes = 5;
        await redis_1.redisClient.setex(`otp:${otpCode}`, minutes * 60, otpCode);
        const message = encodeURIComponent(`*${otpCode}* adalah kode verifikasi Anda.\n\n` +
            `Pengingat keamanan: Untuk memastikan keamanan akun Anda, mohon jangan bagikan informasi apa pun tentang akun Anda kepada siapa pun. kode ini akan expire dalam ${minutes} menit`);
        try {
            await axios_1.default.get(`${configs_1.appConfigs.wablas.url}/send-message?phone=${userWhatsappNumber}&message=${message}&token=${configs_1.appConfigs.wablas.token}`);
        }
        catch (e) {
            logger_service_1.LoggerService.error(`[AuthService]: Failed to send OTP: ${e}`);
            throw e;
        }
    }
    static async verifyOtp(payload) {
        const { otpCode } = payload;
        const storedOtp = await redis_1.redisClient.get(`otp:${otpCode}`);
        if (!storedOtp || storedOtp !== otpCode) {
            const message = 'Invalid or expired OTP!';
            logger_service_1.LoggerService.info(`[AuthService]: Failed to verify OTP: ${message}`);
            throw request_util_1.AppError.badRequest(message);
        }
        await redis_1.redisClient.del(`otp:${otpCode}`);
    }
}
exports.AuthService = AuthService;
