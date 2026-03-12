"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const baseModelFields_1 = require("../interfaces/baseModelFields");
exports.MembershipModel = database_1.sequelizeInit.define('Memberships', {
    ...baseModelFields_1.BaseModelFields,
    membershipId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    membershipUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    membershipCode: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    membershipPoint: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    membershipPointInIdr: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    membershipCategory: {
        type: sequelize_1.DataTypes.ENUM('gold', 'silver', 'platinum'),
        allowNull: false,
        defaultValue: 'silver'
    }
}, {
    tableName: 'memberships',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
