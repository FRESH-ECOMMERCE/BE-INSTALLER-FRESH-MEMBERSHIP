"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appCheck_1 = require("../controllers/appCheck");
const HealthRoute = (0, express_1.Router)();
HealthRoute.get('/', appCheck_1.AppCheckController.mainApp);
HealthRoute.get('/health', appCheck_1.AppCheckController.healthCheck);
exports.default = HealthRoute;
