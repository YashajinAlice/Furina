const { SlashCommandBuilder } = require('@discordjs/builders');
const { CountingSettings } = require('../../db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('设置数数字')
        .setDescription('设置数数字游戏')
        .addChannelOption(option => 
            option.setName('监听频道')
                .setDescription('选择监听的频道')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('起始数字')
                .setDescription('设置起始数字')
                .setRequired(true))
        .addBooleanOption(option => 
            option.setName('可否连续数数字')
                .setDescription('是否允许同一个用户连续数数字')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('监听频道');
        const startNumber = interaction.options.getInteger('起始数字');
        const allowConsecutive = interaction.options.getBoolean('可否连续数数字');

        await CountingSettings.upsert({
            channelId: channel.id,
            currentNumber: startNumber,
            allowConsecutive: allowConsecutive,
            lastUserId: null
        });

        await interaction.reply(`数数字游戏已在 ${channel} 频道设置，起始数字为 ${startNumber}，${allowConsecutive ? '允许' : '不允许'}连续数数字。`);
    },
};
