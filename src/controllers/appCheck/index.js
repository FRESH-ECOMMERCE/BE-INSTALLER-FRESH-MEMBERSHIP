"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCheckController = void 0;
const health_controller_1 = require("./health.controller");
const main_controller_1 = require("./main.controller");
exports.AppCheckController = {
    healthCheck: health_controller_1.healthCheck,
    mainApp: main_controller_1.mainApp
};
