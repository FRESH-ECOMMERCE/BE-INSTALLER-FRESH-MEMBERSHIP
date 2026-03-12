"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticService = void 0;
const logger_service_1 = require("../logger/logger.service");
const user_model_1 = require("../../models/user.model");
const store_model_1 = require("../../models/store.model");
class StatisticService {
    static async getStatistics() {
        const [totalUsers, totalStores] = await Promise.all([
            user_model_1.UserModel.count({
                where: {
                    deleted: 0,
                    userRole: 'user'
                }
            }),
            store_model_1.StoreModel.count({
                where: {
                    deleted: 0
                }
            })
        ]);
        logger_service_1.LoggerService.info('[StatisticService] Statistics fetched', {
            totalUsers,
            totalStores
        });
        return {
            totalUsers,
            totalStores
        };
    }
}
exports.StatisticService = StatisticService;
