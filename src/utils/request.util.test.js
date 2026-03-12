"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const request_util_1 = require("./request.util");
const logger_service_1 = require("../services/logger/logger.service");
jest.mock('../services/logger/logger.service', () => ({
    LoggerService: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn()
    }
}));
const mockedLogger = logger_service_1.LoggerService;
function createMockRes() {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    return { status, json };
}
describe('request.util', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('AppError', () => {
        it('should be instance of Error', () => {
            const err = new request_util_1.AppError('test');
            expect(err).toBeInstanceOf(Error);
            expect(err).toBeInstanceOf(request_util_1.AppError);
        });
        it('should set message and default statusCode 500', () => {
            const err = new request_util_1.AppError('Something broke');
            expect(err.message).toBe('Something broke');
            expect(err.statusCode).toBe(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(err.isOperational).toBe(true);
        });
        it('should accept custom statusCode and isOperational', () => {
            const err = new request_util_1.AppError('Bad', http_status_codes_1.StatusCodes.BAD_REQUEST, false);
            expect(err.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
            expect(err.isOperational).toBe(false);
        });
        it('static notFound should return AppError with 404', () => {
            const err = request_util_1.AppError.notFound('Not found');
            expect(err).toBeInstanceOf(request_util_1.AppError);
            expect(err.message).toBe('Not found');
            expect(err.statusCode).toBe(http_status_codes_1.StatusCodes.NOT_FOUND);
        });
        it('static badRequest should return AppError with 400', () => {
            const err = request_util_1.AppError.badRequest('Invalid input');
            expect(err.message).toBe('Invalid input');
            expect(err.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        });
        it('static conflict should return AppError with 409', () => {
            const err = request_util_1.AppError.conflict('Already exists');
            expect(err.message).toBe('Already exists');
            expect(err.statusCode).toBe(http_status_codes_1.StatusCodes.CONFLICT);
        });
    });
    describe('handleServerError', () => {
        it('should log and return 500 with error code message when err is Error', () => {
            const res = createMockRes();
            const err = new Error('DB connection failed');
            (0, request_util_1.handleServerError)(res, err);
            expect(mockedLogger.error).toHaveBeenCalledWith('Unable to process request!: DB connection failed', { stack: err.stack });
            expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Unable to process request: DB connection failed'
            }));
        });
        it('should log and return 500 with generic message when err is not Error', () => {
            const res = createMockRes();
            (0, request_util_1.handleServerError)(res, 'string error');
            expect(mockedLogger.error).toHaveBeenCalledWith('Unable to process request! Unknown error');
            expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Unable to process request!'
            }));
        });
    });
    describe('handleError', () => {
        it('should return AppError statusCode and message when err is AppError', () => {
            const res = createMockRes();
            const err = request_util_1.AppError.notFound('User not found');
            (0, request_util_1.handleError)(res, err);
            expect(mockedLogger.warn).toHaveBeenCalledWith(`[AppError] ${http_status_codes_1.StatusCodes.NOT_FOUND}: User not found`);
            expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'User not found'
            }));
        });
        it('should delegate to handleServerError when err is not AppError', () => {
            const res = createMockRes();
            const err = new Error('Unexpected');
            (0, request_util_1.handleError)(res, err);
            expect(mockedLogger.error).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        });
    });
});
