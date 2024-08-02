const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment'); // 確保已安裝 moment.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const client = interaction.client;
        const embed = {
            color: 0x0099ff,
            title: 'Furina-Bot 資訊',
            fields: [
                { name: '延迟', value: `${client.ws.ping} ms`, inline: true },
                { name: '开发者', value: '<@697783143347781682>', inline: true },
                { name: '统计数据', value: `已加入 ${client.guilds.cache.size} 个伺服器，已运行 ${client.commandsRun || 0} 次指令`, inline: false },
                { name: '机器人创建时间', value: moment(client.user.createdAt).format('YYYY 年 MM 月 DD 日'), inline: false },
            ],
            footer: {
                text: 'powered by FuLin',
            },
            timestamp: new Date(),
        };

        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [embed] });
            } else {
                await interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            if (error.code === 10062) {
                console.error('Interaction has expired or is invalid.');
            } else {
                console.error('Error replying to interaction:', error);
            }
        }
    },
};