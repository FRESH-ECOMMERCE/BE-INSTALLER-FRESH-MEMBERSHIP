"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerService = void 0;
const logger_service_1 = require("../logger/logger.service");
const request_util_1 = require("../../utils/request.util");
const pagination_util_1 = require("../../utils/pagination.util");
const banner_model_1 = require("../../models/banner.model");
class BannerService {
    static async findAll(page = 1, size = 10) {
        const pagination = new pagination_util_1.Pagination(page, size);
        const { count, rows } = await banner_model_1.BannerModel.findAndCountAll({
            where: { deleted: 0 },
            order: [
                ['bannerId', 'ASC'],
                ['createdAt', 'ASC']
            ],
            limit: pagination.limit,
            offset: pagination.offset
        });
        return pagination.formatData({ count, rows });
    }
    static async findDetail(bannerId) {
        const banner = await banner_model_1.BannerModel.findOne({
            where: { deleted: 0, bannerId }
        });
        if (banner == null) {
            logger_service_1.LoggerService.error('[BannerService] findDetail failed: Banner not found');
            throw request_util_1.AppError.notFound('Banner not found');
        }
        return banner;
    }
    static async create(payload) {
        const banner = await banner_model_1.BannerModel.create(payload);
        logger_service_1.LoggerService.info('[BannerService] Banner created', { bannerId: banner.bannerId });
        return banner;
    }
    static async update(bannerId, payload) {
        if (Object.keys(payload).length === 0)
            return;
        const [affectedRows] = await banner_model_1.BannerModel.update(payload, {
            where: { deleted: 0, bannerId }
        });
        if (affectedRows === 0) {
            logger_service_1.LoggerService.error('[BannerService] update failed: Banner not found');
            throw request_util_1.AppError.notFound('Banner not found');
        }
    }
    static async remove(bannerId) {
        const banner = await banner_model_1.BannerModel.findOne({
            where: { deleted: 0, bannerId }
        });
        if (banner == null) {
            logger_service_1.LoggerService.error('[BannerService] remove failed: Banner not found');
            throw request_util_1.AppError.notFound('Banner not found');
        }
        banner.deleted = true;
        await banner.save();
        logger_service_1.LoggerService.info('[BannerService] Banner removed', { bannerId });
    }
}
exports.BannerService = BannerService;
