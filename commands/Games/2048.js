const { TwoZeroFourEight } = require('discord-gamecord');
module.exports = {
  name: `2048`,
  description: `2048 is a tile-sliding puzzle game in which players combine numbers to reach the elusive 2048 tile`,
  category: `Games`,

  run: async (client, interaction) => {
    const Game = new TwoZeroFourEight({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: '2048',
        color: client.ee.color
      },
      emojis: {
        up: '⬆️',
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
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

