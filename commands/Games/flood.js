const { Flood } = require('discord-gamecord');
module.exports = {
    name: `flood`,
    description: `Flood is a challenging puzzle game where players fill a board with the same color`,
    category: `Games`,

    run: async (client, interaction) => {

        const Game = new Flood({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Flood',
                color: client.ee.color,
            },
            difficulty: 13,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
            winMessage: 'You won! You took **{turns}** turns.',
            loseMessage: 'You lost! You took **{turns}** turns.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
        });

        Game.startGame();
        Game.on('gameOver', result => {
            if (result.result == 'lose') {
                return interaction.editReply({ content: `${client.em.no} You ${result.result}!` })  // =>  { result... }
            } else {
                return interaction.editReply({ content: `${client.em.yes} You ${result.result}!` })  // =>  { result... }

            }
        });
    }

}

