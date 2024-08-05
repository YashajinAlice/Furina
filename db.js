const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false // 禁止日誌輸出
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

const AnnouncementSettings = sequelize.define('AnnouncementSettings', {
    guildId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    announcementChannelId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync({ alter: true })
    .catch(error => console.error('同步資料庫時出現錯誤:', error));

module.exports = { CountingSettings, Warnings, AnnouncementSettings };