"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyProfileService = void 0;
const crypto_1 = require("crypto");
const user_model_1 = require("../../models/user.model");
const request_util_1 = require("../../utils/request.util");
const configs_1 = require("../../configs");
const logger_service_1 = require("../logger/logger.service");
const membership_model_1 = require("../../models/membership.model");
class MyProfileService {
    static async findByUserId(userId) {
        const user = await user_model_1.UserModel.findOne({
            where: { userId: userId },
            attributes: ['userId', 'userName', 'userWhatsappNumber', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: membership_model_1.MembershipModel,
                    as: 'membership',
                    attributes: [
                        'membershipId',
                        'membershipCode',
                        'membershipPoint',
                        'membershipPointInIdr',
                        'membershipCategory'
                    ]
                }
            ]
        });
        if (user == null) {
            logger_service_1.LoggerService.error(`[MyProfileService] findByUserId failed: User not found`);
            throw request_util_1.AppError.notFound('User not found');
        }
        return user;
    }
    static async updateProfile(userId, payload) {
        if (payload.userWhatsappNumber != null && payload.userWhatsappNumber !== '') {
            const existing = await user_model_1.UserModel.findOne({
                where: { userWhatsappNumber: payload.userWhatsappNumber }
            });
            if (existing != null && existing.userId !== userId) {
                logger_service_1.LoggerService.error(`[MyProfileService] update profile failed: Email already in use`);
                throw request_util_1.AppError.conflict('Email already in use');
            }
        }
        const updateData = {};
        if (payload.userName != null && payload.userName.length > 0) {
            updateData.userName = payload.userName ?? '';
        }
        if (payload.userWhatsappNumber != null && payload.userWhatsappNumber.length > 0) {
            updateData.userWhatsappNumber = payload.userWhatsappNumber ?? '';
        }
        if (payload.userPassword != null && payload.userPassword.length > 0) {
            const secret = configs_1.appConfigs.secret.passwordEncryption ?? '';
            updateData.userPassword = (0, crypto_1.createHash)('sha1')
                .update(payload.userPassword + secret)
                .digest('hex');
        }
        if (Object.keys(updateData).length === 0) {
            return;
        }
        const [affectedRows] = await user_model_1.UserModel.update(updateData, {
            where: { userId: userId }
        });
        if (affectedRows === 0) {
            logger_service_1.LoggerService.error(`[MyProfileService] update profile failed: User not found`);
            throw request_util_1.AppError.notFound('User not found');
        }
    }
}
exports.MyProfileService = MyProfileService;
