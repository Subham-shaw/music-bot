const { Snake } = require('discord-gamecord');

module.exports = {
    name: `snake`,
    description: `Navigate a growing snake around obstacles, eat food, and gain points in the classic game of Snake`,
    category: `Games`,

    run: async (client, interaction) => {
        const Game = new Snake({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Snake Game',
                overTitle: 'Game Over',
                color: client.ee.color
            },
            emojis: {
                board: '⬛',
                food: '🍎',
                up: '⬆️',
                down: '⬇️',
                left: '⬅️',
                right: '➡️',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', skull: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
            playerOnlyMessage: 'Only {player} can use these buttons.'
        });

        Game.startGame();
        Game.on('gameOver', result => {
            if (result.result == 'lose') {
                return interaction.editReply({content: `${client.em.no} You ${result.result}!`})  // =>  { result... }
            } else {
                return interaction.editReply({content: `${client.em.yes} You ${result.result}!`})  // =>  { result... }
                
            }
        });
    }

}

