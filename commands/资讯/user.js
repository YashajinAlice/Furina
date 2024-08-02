const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment'); // 確保已安裝 moment.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('資訊')
        .setDescription('顯示使用者資訊')
        .addUserOption(option => 
            option.setName('使用者')
                .setDescription('選擇一個使用者')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('使用者') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const userBanner = await user.fetch().then(u => u.bannerURL({ dynamic: true, size: 512 }));

        const embed = {
            color: 0x0099ff,
            title: `${user.username} 使用者資訊`,
            thumbnail: {
                url: user.displayAvatarURL({ dynamic: true }),
            },
            fields: [
                { name: '顯示名稱', value: member.displayName, inline: true },
                { name: '使用者名稱', value: user.username, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: '帳號創建時間', value: `${moment(user.createdAt).format('YYYY 年 MM 月 DD 日')} | ${moment(user.createdAt).fromNow()}`, inline: false },
                { name: '徽章', value: user.flags.toArray().join(', ') || '無', inline: false },
                { name: '使用者橫幅', value: userBanner ? `[點擊查看橫幅](${userBanner})` : '無', inline: false },
            ],
            footer: {
                text: 'powered by FuLin',
            },
            timestamp: new Date(),
        };

        if (userBanner) {
            embed.image = { url: userBanner };
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