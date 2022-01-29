const {
    Client,
    MessageEmbed, 
    MessageActionRow, 
    MessageButton, 
    MessageCollector, 
    MessageComponentInteraction, 
    MessageSelectMenu, 
    SelectMenuInteraction, 
    Intents 
} = require("discord.js") 
const { TOKEN, PREFIX, READY, BUTTON, ROLE } = require("./settings.json") 
const client = new Client({ 
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_INTEGRATIONS 
    ], 
    presence: { 
        activities: [{ 
            name: READY
        }], 
        status: "dnd" 
    }, 
    restTimeOffset: 60 
})
const { Slash } = require("discord-slash-commands")
const slash = new Slash(client)

// slash komut kurma
client.on("ready", () => {
    slash.command({
        guildOnly: true,
        GuildID: "",
        data: {
            name: "mavera",
            description: "mavera naptın sen gene botmuuu. | githu.com/zquiax",
            type: 4,
            content: `Bu botun sahibi yapımcısı geliştiricisi <@879100546559148033> (\`mavera\` - \`879100546559148033\` | https://github.com/zquiax`
        }
    })
})
// Elinda Komut Oluşturdu #

// Elinda Files
client.on("messageCreate", async(msg) => {
    let args = msg.content.trim().split(" ")
    let tadaEmoji = msg.client.emojis.cache.find(x => x.name == "tada emoji id koy eşşek")
    let gifEmoji = msg.client.emojis.cache.find(x => x.name == "star emoji id koysana amk")
    let rolAlEmoji = msg.client.emojis.cache.find(x => x.name == "no gircen tel no degillll amk emoji hatalı emoji red yani amk anla bunu")
    if(msg.content.includes("mavera")) {
        const actions = new MessageActionRow()
        .addComponets(new MessageSelectMenu()
        .setCustomId("event")
        .setPlaceholder("Elinda Etkinlik Rol Menü") // Buraya İstedigin bir isim gir
        .addOptions([
            { 
                label: "Çekiliş Katılımcısı", 
                value: "çekiliş", 
                description: "Elinda dediki buttona tıkla amk!", 
                emoji: tadaEmoji 
            }, 
            { 
                label: "Etkinlik Katılımcısı", // başlık 
                value: "etkinlik", // SET ID 
                description: "Elinda dediki buttona tıkla amk", // acıklama 
                emoji: giftEmoji // soldaki emoji  
            }, 
            { 
                label: "Etkinlik Rollerini Al", 
                value: "eventAl", 
                description: "Elinda dediki buttona tıkla amk", 
                emoji: rolAlEmoji 
            } 
        ])) 
 
        msg.channel.send({ 
            content: `Developed By Mavera.`, 
            components: [actions] 
        }) 
    } 
}) 
 
client.on("interactionCreate", async(interaction) => { 
    let values = interaction.values[0] 
    let events = [ 
        "çekiliş", 
        "etkinlik", 
        "eventAl" 
    ] 
 
    if(events.some((cmd) => values.includes(cmd))) { 
        function rolVarsaRemove() { 
            interaction.member.roles.cache.forEach(role => { 
                BUTTON.ETKCEK.forEach(roles => { 
                    role.id === roles ? interaction.member.roles.remove(role.id) : false 
                }) 
            }) 
        } 
 
        if(values === "çekiliş") { 
            if(interaction.member.roles.cache.get(BUTTON.CEKILIS)) { 
                rolVarsaRemove() 
                interaction.reply({ 
                    content: `<@${interaction.member.id}>, çekiliş rolünü üstünden aldım!`, 
                    ephemeral: true 
                }) 
            } else { 
                interaction.member.roles.add(BUTTON.CEKILIS) 
                interaction.reply({ 
                    content: `<@${interaction.member.id}>, çekiliş rolünü üstüne verdim!`, 
                    ephemeral: true 
                }) 
            } 
        } else if(values === "etkinlik") { 
            if(interaction.member.roles.cache.get(BUTTON.ETKNLIK)) { 
                rolVarsaRemove() 
                interaction.reply({ 
                    content: `<@${interaction.member.id}>, etkinlik rolünü üstünden aldım!`,  
                    ephemeral: true 
                }) 
            } else { 
                interaction.member.roles.add(BUTTON.ETKNLIK) 
                interaction.reply({ 
                    content: `<@${interaction.member.id}>, etkinlik rolünü üstüne verdim!`, 
                    ephemeral: true 
                }) 
            } 
        } else if(values === "eventAl") { 
            if(interaction.member.roles.cache.get(BUTTON.ETKNLIK) || interaction.member.roles.cache.get(BUTTON.CEKILIS) || interaction.member.roles.cache.get(BUTTON.ETKNLIK) && interaction.member.roles.cache.get(BUTTON.CEKILIS)) { 
                rolVarsaRemove() 
                interaction.reply({ 
                    content: `Selam <@${interaction.member.id}>, üstünde bulunan katılımcı rollerini aldım!`, 
                    ephemeral: true 
                }) 
            } else { 
                interaction.reply({ 
                    content: `<@${interaction.member.id}>, üstünde rol bulunmadığı için bu işlemi gerçekleştiremiyorum.`,  
                    ephemeral: true 
                }) 
            } 
        } 
    } 
}) 
// interaction files #

client.login(TOKEN).then(console.log(`[MAVERA_V13_BUTTON_SYSTEM]: Mavera Bot Login!`))

