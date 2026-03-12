"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const baseModelFields_1 = require("../interfaces/baseModelFields");
exports.PointTransactionModel = database_1.sequelizeInit.define('PointTransactions', {
    ...baseModelFields_1.BaseModelFields,
    pointTransactionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    pointTransactionUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    pointTransactionMembershipId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    pointTransactionPoint: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    pointTransactionPointInIdr: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pointTransactionProductName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    pointTransactionProductPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pointTransactionStoreName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    pointTransactionType: {
        type: sequelize_1.DataTypes.ENUM('earn', 'redeem'),
        allowNull: false
    }
}, {
    tableName: 'point_transactions',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
