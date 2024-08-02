const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

// 遞迴讀取 commands 資料夾中的所有指令檔案
const loadCommands = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            loadCommands(path.join(dir, file.name));
        } else if (file.name.endsWith('.js')) {
            const command = require(path.join(dir, file.name));
            commands.push(command.data.toJSON());
        }
    }
};

// 加載所有指令
loadCommands(commandsPath);

// 顯示已註冊的指令數量
console.log(`已註冊 ${commands.length} 個指令。`);

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('開始刷新應用程式 (/) 指令。');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('成功重新載入應用程式 (/) 指令。');
    } catch (error) {
        console.error(error);
    }
})();