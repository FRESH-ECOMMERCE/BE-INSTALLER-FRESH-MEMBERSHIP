"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointConvertionService = void 0;
const logger_service_1 = require("../logger/logger.service");
const request_util_1 = require("../../utils/request.util");
const pointConvertion_model_1 = require("../../models/pointConvertion.model");
class PointConvertionService {
    static async find() {
        const pointConvertion = await pointConvertion_model_1.PointConvertionModel.findOne({
            where: { deleted: 0 }
        });
        if (pointConvertion == null) {
            logger_service_1.LoggerService.error('[PointConvertionService] find failed: PointConvertion not found');
            throw request_util_1.AppError.notFound('PointConvertion not found');
        }
        return pointConvertion;
    }
    static async createOrUpdate(payload) {
        const existingPointConvertion = await pointConvertion_model_1.PointConvertionModel.findOne({
            where: { deleted: 0 }
        });
        if (existingPointConvertion == null) {
            await pointConvertion_model_1.PointConvertionModel.create({
                pointConvertionPoint: 1,
                pointConvertionPointInIdr: payload.pointConvertionPointInIdr
            });
        }
        else {
            existingPointConvertion.pointConvertionPointInIdr =
                payload.pointConvertionPointInIdr;
            await existingPointConvertion.save();
        }
    }
}
exports.PointConvertionService = PointConvertionService;
