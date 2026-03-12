"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const logFilePath = path_1.default.join(__dirname, '../../../logs', 'app.log');
const errorLogFilePath = path_1.default.join(__dirname, '../../../logs', 'error.log');
class LoggerService {
    static logger = (0, winston_1.createLogger)({
        level: 'info',
        format: winston_1.format.combine(winston_1.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
        defaultMeta: { service: 'backend-service' },
        transports: [
            new winston_1.transports.File({ filename: logFilePath, level: 'info' }),
            new winston_1.transports.File({ filename: errorLogFilePath, level: 'error' }),
            new winston_1.transports.Console({
                format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
            })
        ]
    });
    static info(message, meta) {
        this.logger.info(message, meta);
    }
    static error(message, meta) {
        this.logger.error(message, meta);
    }
    static warn(message, meta) {
        this.logger.warn(message, meta);
    }
    static debug(message, meta) {
        this.logger.debug(message, meta);
    }
}
exports.LoggerService = LoggerService;
exports.default = LoggerService;
