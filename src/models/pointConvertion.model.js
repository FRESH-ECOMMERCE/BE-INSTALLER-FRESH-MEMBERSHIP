"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointConvertionModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const baseModelFields_1 = require("../interfaces/baseModelFields");
exports.PointConvertionModel = database_1.sequelizeInit.define('PointConvertions', {
    ...baseModelFields_1.BaseModelFields,
    pointConvertionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    pointConvertionPoint: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    pointConvertionPointInIdr: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'point_convertions',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
