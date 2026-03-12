"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionService = void 0;
const logger_service_1 = require("../logger/logger.service");
const request_util_1 = require("../../utils/request.util");
const pagination_util_1 = require("../../utils/pagination.util");
const membership_model_1 = require("../../models/membership.model");
const database_1 = require("../../configs/database");
const pointTransactionModel_1 = require("../../models/pointTransactionModel");
const pointConvertion_service_1 = require("../pointConvertion/pointConvertion.service");
class PointTransactionService {
    static async transaction() {
        return await database_1.sequelizeInit.transaction();
    }
    static async findAll(page = 1, size = 10, pointTransactionUserId = 0) {
        const pagination = new pagination_util_1.Pagination(page, size);
        const whereClause = { deleted: 0 };
        if (pointTransactionUserId > 0) {
            whereClause.pointTransactionUserId = pointTransactionUserId;
        }
        const { count, rows } = await pointTransactionModel_1.PointTransactionModel.findAndCountAll({
            where: whereClause,
            order: [['pointTransactionId', 'DESC']],
            limit: pagination.limit,
            offset: pagination.offset
        });
        return pagination.formatData({ count, rows });
    }
    static async create(payload) {
        const t = await this.transaction();
        try {
            const isRedeem = payload.pointTransactionType === 'redeem';
            const isEarn = payload.pointTransactionType === 'earn';
            const membership = await membership_model_1.MembershipModel.findOne({
                where: { deleted: 0, membershipCode: payload.pointTransactionMembershipCode },
                transaction: t
            });
            if (membership == null) {
                logger_service_1.LoggerService.error('[PointTransactionService] create failed: Membership not found');
                throw request_util_1.AppError.notFound('Membership not found');
            }
            if (isRedeem && payload.pointTransactionPoint > membership.membershipPoint) {
                logger_service_1.LoggerService.error('[PointTransactionService] create failed: Membership point is not enough');
                throw request_util_1.AppError.badRequest('PointTransaction point is not enough');
            }
            const pointConvertion = await pointConvertion_service_1.PointConvertionService.find();
            const signedPoint = isEarn && !isRedeem
                ? payload.pointTransactionPoint
                : isRedeem && !isEarn
                    ? -payload.pointTransactionPoint
                    : 0;
            const pointConvertionPointInIdr = Number(pointConvertion.pointConvertionPointInIdr);
            if (!Number.isFinite(pointConvertionPointInIdr)) {
                logger_service_1.LoggerService.error('[PointTransactionService] create failed: Invalid point convertion value', { pointConvertionPointInIdr: pointConvertion.pointConvertionPointInIdr });
                throw request_util_1.AppError.badRequest('Invalid point convertion value');
            }
            const signedPointInIdr = pointConvertionPointInIdr * signedPoint;
            const pointTransactionPayload = {
                pointTransactionUserId: membership.membershipUserId,
                pointTransactionMembershipId: membership.membershipId,
                pointTransactionPoint: signedPoint,
                pointTransactionPointInIdr: signedPointInIdr,
                pointTransactionProductName: payload.pointTransactionProductName ?? '',
                pointTransactionProductPrice: payload.pointTransactionProductPrice ?? 0,
                pointTransactionStoreName: payload.pointTransactionStoreName ?? '',
                pointTransactionType: payload.pointTransactionType
            };
            await membership.increment({
                membershipPoint: signedPoint,
                membershipPointInIdr: signedPointInIdr
            }, { transaction: t });
            const pointTransaction = await pointTransactionModel_1.PointTransactionModel.create(pointTransactionPayload, { transaction: t });
            await t.commit();
            logger_service_1.LoggerService.info('[PointTransactionService] PointTransaction created', {
                pointTransactionId: pointTransaction.pointTransactionId
            });
            return pointTransaction;
        }
        catch (error) {
            logger_service_1.LoggerService.error('[PointTransactionService] create failed: ', error);
            await t.rollback();
            throw error;
        }
    }
    static async remove(pointTransactionId) {
        const pointTransaction = await pointTransactionModel_1.PointTransactionModel.findOne({
            where: { deleted: 0, pointTransactionId: pointTransactionId }
        });
        if (pointTransaction == null) {
            logger_service_1.LoggerService.error('[PointTransactionService] remove failed: PointTransaction not found');
            throw request_util_1.AppError.notFound('PointTransaction not found');
        }
        pointTransaction.deleted = true;
        await pointTransaction.save();
        logger_service_1.LoggerService.info('[PointTransactionService] PointTransaction removed', {
            pointTransactionId
        });
    }
}
exports.PointTransactionService = PointTransactionService;
