"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const baseModelFields_1 = require("../interfaces/baseModelFields");
const membership_model_1 = require("./membership.model");
exports.UserModel = database_1.sequelizeInit.define('Users', {
    ...baseModelFields_1.BaseModelFields,
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    userPassword: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    userWhatsappNumber: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
exports.UserModel.hasOne(membership_model_1.MembershipModel, {
    foreignKey: 'membershipUserId',
    sourceKey: 'userId',
    as: 'membership'
});
membership_model_1.MembershipModel.belongsTo(exports.UserModel, {
    foreignKey: 'membershipUserId',
    targetKey: 'userId',
    as: 'user'
});
