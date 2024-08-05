const { SlashCommandBuilder } = require('@discordjs/builders');
const { AnnouncementSettings } = require('../../db'); // 確保路徑正確

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new')
        .setDescription('设置伺服器要接收新闻的频道')
        .addChannelOption(option => 
            option.setName('频道')
                .setDescription('要接收新闻的频道')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('频道');
        if (!channel) {
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: '請提供一個有效的頻道。', ephemeral: true });
            }
            return;
        }

        // 檢查是否已經設置了接收公告的頻道
        const existingSetting = await AnnouncementSettings.findOne({ where: { guildId: interaction.guild.id } });
        if (existingSetting) {
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: '已經設置了接收公告的頻道。', ephemeral: true });
            }
            return;
        }

        // 保存新的設置到數據庫
        await AnnouncementSettings.create({ guildId: interaction.guild.id, announcementChannelId: channel.id });
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: `已成功設置 ${channel} 為接收公告的頻道。`, ephemeral: true });
        }
    }
};