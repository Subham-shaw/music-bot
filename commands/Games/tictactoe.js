const { TicTacToe } = require('discord-gamecord');

module.exports = {
    name: `tictactoe`,
    description: `Tic Tac Toe is a two-player game in which each player takes turns marking a 3x3 grid with Xs or Os`,
    category: `Games`,
    options: [{
        name: `user`,
        description: `The User you want to compete`,
        type: 6,
        required: true,
    }],

    run: async (client, interaction) => {
        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('user'),
            embed: {
                title: 'Tic Tac Toe',
                color: client.ee.color,
                statusTitle: 'Status',
                overTitle: 'Game Over'
            },
            emojis: {
                xButton: '❌',
                oButton: '🔵',
                blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} | Its turn of player **{player}**.',
            winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
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

