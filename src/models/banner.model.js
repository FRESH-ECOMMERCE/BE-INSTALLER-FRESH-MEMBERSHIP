"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const baseModelFields_1 = require("../interfaces/baseModelFields");
exports.BannerModel = database_1.sequelizeInit.define('Banners', {
    ...baseModelFields_1.BaseModelFields,
    bannerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    bannerImage: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    bannerOrder: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'banners',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
