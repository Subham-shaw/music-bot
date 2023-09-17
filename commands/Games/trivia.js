const { Trivia } = require('discord-gamecord');

module.exports = {
    name: `trivia`,
    description: `Trivia is a game in which players answer questions on various topics to score points.`,
    category: `Games`,

    run: async (client, interaction) => {
        const Game = new Trivia({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Trivia',
              color: client.ee.color,
              description: 'You have 60 seconds to guess the answer.'
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            trueButtonStyle: 'SUCCESS',
            falseButtonStyle: 'DANGER',
            mode: 'multiple',  // multiple || single
            difficulty: 'medium',  // easy || medium || hard
            winMessage: 'You won! The correct answer is {answer}.',
            loseMessage: 'You lost! The correct answer is {answer}.',
            errMessage: 'Unable to fetch question data! Please try again.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
    }
}