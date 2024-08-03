const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const CountingSettings = sequelize.define('CountingSettings', {
    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    currentNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    allowConsecutive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    lastUserId: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

sequelize.sync({ alter: true }); // 使用 alter 选项来更新现有表结构

module.exports = { CountingSettings };
