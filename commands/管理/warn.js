const { SlashCommandBuilder } = require('@discordjs/builders');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { Warnings } = require('../../db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('警告')
        .setDescription('警告用户')
        .addUserOption(option => 
            option.setName('用户')
                .setDescription('选择要警告的用户')
                .setRequired(true))
        .addBooleanOption(option => 
            option.setName('私讯')
                .setDescription('是否要私讯给用户')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('用户');
        const dmUser = interaction.options.getBoolean('私讯');

        // 创建并显示模态框
        const modal = new ModalBuilder()
            .setCustomId('警告原因')
            .setTitle('输入警告原因')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('原因')
                        .setLabel('警告原因')
                        .setStyle(TextInputStyle.Paragraph) // 确保设置了样式
                        .setPlaceholder('请输入警告原因...')
                        .setRequired(true)
                )
            );

        await interaction.showModal(modal);

        // 保存用户和私讯选项到 interaction 对象
        interaction.client.warnData = { user, dmUser };
    },
};
