const { MatchPairs } = require('discord-gamecord');

module.exports = {
    name: `matchpairs`,
    description: `Match Pairs is a memory game where players flip over cards to find matching pairs`,
    category: `Games`,

    run: async (client, interaction) => {
        const Game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Match Pairs',
                color: client.ee.color,
                description: '**Click on the buttons to match emojis with their pairs.**'
            },
            timeoutTime: 60000,
            emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
            winMessage: '**You won the Game! You turned a total of `{tilesTurned}` tiles.**',
            loseMessage: '**You lost the Game! You turned a total of `{tilesTurned}` tiles.**',
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

