const TMath  = require("tmath");
module.exports = {
    name: `calculator`,
    description: `Button-Based Calculator`,
    category: 'Miscellaneous',
    run: async(client, interaction) => {
        const calculator = new TMath({
            destroy: "Oh no, you locked me! :0", // Optional, default is "Calculator Locked"
            invalid: "Next time just in a valid calculation! o.o", // Optional, default is "Invalid Calculation"
            notOwner: "Hey, use your own calculator! c.c", // Optional, default is "Only the author can use the calculator! Run the command to create you're own."
            deactivateMessage: "Well, just got deactivated :x", // Optional, default is "The Calculator got deactivated"
            deactivateTimeout: "11m", // optional, default are 10 minutes
            request: interaction, // A Interaction or Message
            user: interaction.user // Required, the user who called the request
        });
        
        // Replying with the calculator setup
        const reply = calculator.getReply();
        const message = await interaction.reply(reply); // or channel.send, message.reply, etc
        
        // Handling the calculations
        calculator.handle(message);
    }
}