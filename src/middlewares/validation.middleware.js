"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schemas) => (req, res, next) => {
    const locations = ['body', 'query', 'params'];
    for (const location of locations) {
        const schema = schemas[location];
        if (schema == null)
            continue;
        const result = schema.safeParse(req[location]);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.flatten()
            });
        }
        ;
        req[location] = result.data;
    }
    return next();
};
exports.validate = validate;
