"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mockLogger;
jest.mock('winston', () => {
    mockLogger = {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn()
    };
    return {
        __esModule: true,
        createLogger: jest.fn(() => mockLogger),
        format: {
            combine: jest.fn(() => 'combined'),
            timestamp: jest.fn(() => 'timestamp'),
            errors: jest.fn(() => 'errors'),
            splat: jest.fn(() => 'splat'),
            json: jest.fn(() => 'json'),
            colorize: jest.fn(() => 'colorize'),
            simple: jest.fn(() => 'simple')
        },
        transports: {
            File: jest.fn(),
            Console: jest.fn()
        }
    };
});
const logger_service_1 = require("./logger.service");
describe('LoggerService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call logger.info with message and meta', () => {
        const meta = { context: 'test' };
        logger_service_1.LoggerService.info('info message', meta);
        expect(mockLogger.info).toHaveBeenCalledWith('info message', meta);
    });
    it('should call logger.error with message and meta', () => {
        const meta = { context: 'error' };
        logger_service_1.LoggerService.error('error message', meta);
        expect(mockLogger.error).toHaveBeenCalledWith('error message', meta);
    });
    it('should call logger.warn with message and meta', () => {
        const meta = { context: 'warn' };
        logger_service_1.LoggerService.warn('warn message', meta);
        expect(mockLogger.warn).toHaveBeenCalledWith('warn message', meta);
    });
    it('should call logger.debug with message and meta', () => {
        const meta = { context: 'debug' };
        logger_service_1.LoggerService.debug('debug message', meta);
        expect(mockLogger.debug).toHaveBeenCalledWith('debug message', meta);
    });
});
