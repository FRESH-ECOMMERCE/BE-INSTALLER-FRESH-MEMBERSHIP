"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPointConvertionSchema = void 0;
const zod_1 = require("zod");
exports.createPointConvertionSchema = zod_1.z.object({
    pointConvertionPointInIdr: zod_1.z.number().int().positive()
});
