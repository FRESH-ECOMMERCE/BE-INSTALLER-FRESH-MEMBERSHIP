"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const _1 = require(".");
const logger_service_1 = require("../services/logger/logger.service");
const redisClient = new ioredis_1.default({
    host: _1.appConfigs.redis.host || '127.0.0.1',
    port: Number(_1.appConfigs.redis.port) || 6379
});
exports.redisClient = redisClient;
redisClient.on('connect', () => logger_service_1.LoggerService.info('✅ Connected to Redis'));
redisClient.on('error', (err) => logger_service_1.LoggerService.error('❌ Redis Error:', err));
