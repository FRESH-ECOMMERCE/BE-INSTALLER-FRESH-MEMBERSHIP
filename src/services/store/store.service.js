"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const logger_service_1 = require("../logger/logger.service");
const request_util_1 = require("../../utils/request.util");
const pagination_util_1 = require("../../utils/pagination.util");
const store_model_1 = require("../../models/store.model");
class StoreService {
    static async findAll(page = 1, size = 10) {
        const pagination = new pagination_util_1.Pagination(page, size);
        const { count, rows } = await store_model_1.StoreModel.findAndCountAll({
            where: { deleted: 0 },
            order: [
                ['storeId', 'ASC'],
                ['createdAt', 'ASC']
            ],
            limit: pagination.limit,
            offset: pagination.offset
        });
        return pagination.formatData({ count, rows });
    }
    static async findDetail(storeId) {
        const store = await store_model_1.StoreModel.findOne({
            where: { storeId }
        });
        if (store == null) {
            logger_service_1.LoggerService.error('[StoreService] findDetail failed: Store not found');
            throw request_util_1.AppError.notFound('Store not found');
        }
        return store;
    }
    static async create(payload) {
        const store = await store_model_1.StoreModel.create(payload);
        logger_service_1.LoggerService.info('[StoreService] Store created', { storeId: store.storeId });
        return store;
    }
    static async update(storeId, payload) {
        if (Object.keys(payload).length === 0)
            return;
        const [affectedRows] = await store_model_1.StoreModel.update(payload, {
            where: { storeId }
        });
        if (affectedRows === 0) {
            logger_service_1.LoggerService.error('[StoreService] update failed: Store not found');
            throw request_util_1.AppError.notFound('Store not found');
        }
    }
    static async remove(storeId) {
        const store = await store_model_1.StoreModel.findOne({
            where: { storeId, deleted: 0 }
        });
        if (store == null) {
            logger_service_1.LoggerService.error('[StoreService] remove failed: Store not found');
            throw request_util_1.AppError.notFound('Store not found');
        }
        store.deleted = true;
        await store.save();
        logger_service_1.LoggerService.info('[StoreService] Store removed', { storeId });
    }
}
exports.StoreService = StoreService;
