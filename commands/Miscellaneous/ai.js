const fetch = require("node-fetch")
// import fetch from 'node-fetch'

module.exports ={
    name: `ai`,
    description: `An AI-Chat Module`,
    category: 'Miscellaneous',
    options: [
        {
            name: `question`,
            description: `Ask a question`,
            type: 3,
            required: true,
        }
    ],

    run: async(client, interaction) => {
      await interaction.deferReply()
        let qes = await interaction.options.getString('question')

        try{
            fetch(`http://api.brainshop.ai/get?bid=175064&key=GvfhfPKdZyK3bbQQ&uid=1&msg=${encodeURIComponent(qes)}`)
            .then(res => res.json())
            .then(data => {
              return interaction.followUp({content: data.cnt}).catch(() => {})
            });
          }catch (e){
            return interaction.followUp({content: "❌ AI CHAT API IS DOWN"}).catch(() => {})
          }
    }
}