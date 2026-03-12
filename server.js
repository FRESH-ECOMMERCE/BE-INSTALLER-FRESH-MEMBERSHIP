"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const configs_1 = require("./src/configs");
const logger_service_1 = require("./src/services/logger/logger.service");
const PORT = configs_1.appConfigs.app.port || 8000;
const server = app_1.default.listen(PORT, () => {
    logger_service_1.LoggerService.info(`Server running on http://localhost:${PORT}`);
});
process.on('SIGTERM', () => {
    logger_service_1.LoggerService.info('SIGTERM received. Shutting down gracefully.');
    server.close(() => {
        logger_service_1.LoggerService.info('HTTP server closed.');
    });
});
process.on('uncaughtException', (err) => {
    logger_service_1.LoggerService.error('Uncaught Exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_service_1.LoggerService.error('Unhandled Rejection:', reason);
});
