"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipService = void 0;
const logger_service_1 = require("../logger/logger.service");
const request_util_1 = require("../../utils/request.util");
const pagination_util_1 = require("../../utils/pagination.util");
const membership_model_1 = require("../../models/membership.model");
const user_model_1 = require("../../models/user.model");
const sequelize_1 = require("sequelize");
class MembershipService {
    static async findAll(page = 1, size = 10, search = '') {
        const pagination = new pagination_util_1.Pagination(page, size);
        const { count, rows } = await membership_model_1.MembershipModel.findAndCountAll({
            where: { deleted: 0 },
            include: [
                {
                    model: user_model_1.UserModel,
                    where: {
                        userName: {
                            [sequelize_1.Op.like]: `%${search}%`
                        }
                    },
                    as: 'user',
                    attributes: [
                        'userId',
                        'userName',
                        'userWhatsappNumber',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            ],
            order: [
                ['membershipId', 'ASC'],
                ['createdAt', 'ASC']
            ],
            limit: pagination.limit,
            offset: pagination.offset
        });
        return pagination.formatData({ count, rows });
    }
    static async findDetail(membershipId) {
        const membership = await membership_model_1.MembershipModel.findOne({
            where: { membershipId }
        });
        if (membership == null) {
            logger_service_1.LoggerService.error('[MembershipService] findDetail failed: Membership not found');
            throw request_util_1.AppError.notFound('Membership not found');
        }
        return membership;
    }
    static async findByMembershipCode(membershipCode) {
        const membership = await membership_model_1.MembershipModel.findOne({
            where: { membershipCode }
        });
        if (membership == null) {
            logger_service_1.LoggerService.error('[MembershipService] findDetail failed: Membership not found');
            throw request_util_1.AppError.notFound('Membership not found');
        }
        const user = await user_model_1.UserModel.findOne({
            where: { userId: membership.membershipUserId },
            attributes: ['userId', 'userName', 'userWhatsappNumber', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: membership_model_1.MembershipModel,
                    as: 'membership',
                    attributes: [
                        'membershipId',
                        'membershipCode',
                        'membershipPoint',
                        'membershipCategory'
                    ]
                }
            ]
        });
        if (user == null) {
            logger_service_1.LoggerService.error('[MembershipService] findDetail failed: User not found');
            throw request_util_1.AppError.notFound('User not found');
        }
        return user;
    }
    static async create(payload) {
        const user = await user_model_1.UserModel.findOne({
            where: { userId: payload.membershipUserId }
        });
        if (user == null) {
            logger_service_1.LoggerService.error('[MembershipService] create failed: User not found');
            throw request_util_1.AppError.notFound('User not found');
        }
        const membershipCode = `${user.userName.slice(0, 3).toUpperCase()}-${user.userWhatsappNumber}`;
        const membership = await membership_model_1.MembershipModel.create({
            membershipUserId: payload.membershipUserId,
            membershipCode: membershipCode,
            membershipPoint: 0,
            membershipPointInIdr: 0,
            membershipCategory: 'silver'
        });
        logger_service_1.LoggerService.info('[MembershipService] Membership created', {
            membershipId: membership.membershipId
        });
        return membership;
    }
    static async update(membershipId, payload) {
        if (Object.keys(payload).length === 0)
            return;
        const [affectedRows] = await membership_model_1.MembershipModel.update(payload, {
            where: { membershipId }
        });
        if (affectedRows === 0) {
            logger_service_1.LoggerService.error('[MembershipService] update failed: Membership not found');
            throw request_util_1.AppError.notFound('Membership not found');
        }
    }
    static async remove(membershipId) {
        const membership = await membership_model_1.MembershipModel.findOne({
            where: { membershipId, deleted: 0 }
        });
        if (membership == null) {
            logger_service_1.LoggerService.error('[MembershipService] remove failed: Membership not found');
            throw request_util_1.AppError.notFound('Membership not found');
        }
        membership.deleted = true;
        await membership.save();
        logger_service_1.LoggerService.info('[MembershipService] Membership removed', { membershipId });
    }
}
exports.MembershipService = MembershipService;
