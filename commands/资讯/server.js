const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment'); // 確保已安裝 moment.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('伺服器')
        .setDescription('顯示伺服器資訊'),
    async execute(interaction) {
        const guild = interaction.guild;
        const owner = await guild.fetchOwner();

        const embed = {
            color: 0x0099ff,
            title: `${guild.name} 伺服器資訊`,
            thumbnail: {
                url: guild.iconURL({ dynamic: true }),
            },
            fields: [
                { name: '伺服器名稱', value: guild.name, inline: true },
                { name: '伺服器 ID', value: guild.id, inline: true },
                { name: '擁有者', value: `${owner.user.tag} (${owner.user.id})`, inline: true },
                { name: '成員數量', value: guild.memberCount.toString(), inline: true },
                { name: '創建時間', value: `${moment(guild.createdAt).format('YYYY 年 MM 月 DD 日')} | ${moment(guild.createdAt).fromNow()}`, inline: false },
                { name: '伺服器橫幅', value: guild.bannerURL() ? `[點擊查看橫幅](${guild.bannerURL()})` : '無', inline: false },
            ],
            footer: {
                text: 'powered by FuLin',
            },
            timestamp: new Date(),
        };

        if (guild.bannerURL()) {
            embed.image = { url: guild.bannerURL() };
        }

        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [embed] });
            } else {
                await interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            if (error.code === 10062) {
                console.error('Interaction has expired or is invalid.');
            } else if (error.code === 40060) {
                console.error('Interaction has already been acknowledged.');
            } else {
                console.error('Error replying to interaction:', error);
            }
        }
    },
};