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

const Warnings = sequelize.define('Warnings', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    warnedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

sequelize.sync({ alter: true });

module.exports = { CountingSettings, Warnings };
