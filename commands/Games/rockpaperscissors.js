const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
  name: `rockpaperscissors`,
  description: `Rock Paper Scissors is a simple game in which players choose hand gestures to beat opponents`,
  category: `Games`,
  options: [{
    name: `user`,
    description: `The User you want to compete`,
    type: 6,
    required: true,
  }],

  run: async (client, interaction) => {
    const Game = new RockPaperScissors({
      message: interaction,
      isSlashGame: true,
      opponent: interaction.options.getUser('user'),
      embed: {
        title: 'Rock Paper Scissors',
        color: client.ee.color,
        description: 'Press a button below to make a choice.'
      },
      buttons: {
        rock: 'Rock',
        paper: 'Paper',
        scissors: 'Scissors'
      },
      emojis: {
        rock: '🌑',
        paper: '📰',
        scissors: '✂️'
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      pickMessage: 'You choose {emoji}.',
      winMessage: '**{player}** won the Game! Congratulations!',
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

