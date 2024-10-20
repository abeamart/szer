const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
  //deleted:true,
  data: new SlashCommandBuilder()
    .setName('stwórz-klasę')
    .setDescription('tworzy nową klasę')
    .addStringOption(option =>
      option.setName('nazwa')
        .setDescription('wpisz nazwe klasy')
        .setRequired(true)),

  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true })
    const grade = interaction.options.getString('nazwa')
    if (grade.length !== 2 && !isNaN(Number(grade[0]))) { interaction.editReply(`podana klasa musi składać się z dwóch elementów, a pierwsza z nich to cyfra, a nie ${grade}`); return }

    const gradeclass = grade[0]
    let gradecolor = '#ffb31c'
    if (gradeclass === '1') { gradecolor = '#ffefca' }
    if (gradeclass === '2') { gradecolor = '#fff581' }
    if (gradeclass === '3') { gradecolor = '#ffdc72' }
    console.log(gradecolor)
    interaction.guild.roles.create({
      data: {
        name: grade,
        color: gradecolor,
      },
      reason: 'nowa klasa!',
    })
      .then(role => {
        console.log(role)


        interaction.guild.channels.create({

          name: `klasowy ${grade}`,
          type: ChannelType.GuildCategory,
          parent: interaction.guild,
          permissionOverwrites:
            [
              {
                id: process.env.ADMIN_ROLE,
                allow: [PermissionsBitField.Flags.CreateInstantInvite,
                PermissionsBitField.Flags.SendMessages,
                PermissionsBitField.Flags.SendMessagesInThreads,
                PermissionsBitField.Flags.CreatePublicThreads,
                PermissionsBitField.Flags.CreatePrivateThreads,
                PermissionsBitField.Flags.EmbedLinks,
                PermissionsBitField.Flags.AttachFiles,
                PermissionsBitField.Flags.AddReactions,
                PermissionsBitField.Flags.UseExternalEmojis,
                PermissionsBitField.Flags.UseExternalStickers,
                PermissionsBitField.Flags.MentionEveryone,
                PermissionsBitField.Flags.ManageMessages,
                PermissionsBitField.Flags.ManageThreads,
                PermissionsBitField.Flags.ReadMessageHistory,
                PermissionsBitField.Flags.SendTTSMessages,
                PermissionsBitField.Flags.SendVoiceMessages,
                PermissionsBitField.Flags.Connect,
                PermissionsBitField.Flags.Speak,
                PermissionsBitField.Flags.Stream,
                PermissionsBitField.Flags.UseSoundboard,
                PermissionsBitField.Flags.UseExternalSounds,
                PermissionsBitField.Flags.PrioritySpeaker,
                PermissionsBitField.Flags.MuteMembers,
                PermissionsBitField.Flags.DeafenMembers,
                PermissionsBitField.Flags.MoveMembers,
                PermissionsBitField.Flags.UseApplicationCommands,
                PermissionsBitField.Flags.UseEmbeddedActivities,
                PermissionsBitField.Flags.RequestToSpeak,
                PermissionsBitField.Flags.CreateEvents,
                PermissionsBitField.Flags.ManageEvents,
                ],
                deny: [PermissionsBitField.Flags.ManageChannels,
                PermissionsBitField.Flags.ManageRoles,
                PermissionsBitField.Flags.ManageWebhooks,

                ]
              },
              {
                id: process.env.MISJONARZ_ROLE,
                allow: [
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.SendMessagesInThreads,
                  PermissionsBitField.Flags.CreatePublicThreads,
                  PermissionsBitField.Flags.CreatePrivateThreads,
                  PermissionsBitField.Flags.EmbedLinks,
                  PermissionsBitField.Flags.AttachFiles,
                  PermissionsBitField.Flags.AddReactions,
                  PermissionsBitField.Flags.UseExternalEmojis,
                  PermissionsBitField.Flags.UseExternalStickers,
                  PermissionsBitField.Flags.MentionEveryone,
                  PermissionsBitField.Flags.ManageThreads,
                  PermissionsBitField.Flags.ReadMessageHistory,
                  PermissionsBitField.Flags.SendTTSMessages,
                  PermissionsBitField.Flags.SendVoiceMessages,
                  PermissionsBitField.Flags.Connect,
                  PermissionsBitField.Flags.Speak,
                  PermissionsBitField.Flags.Stream,
                  PermissionsBitField.Flags.UseSoundboard,
                  PermissionsBitField.Flags.UseExternalSounds,
                  PermissionsBitField.Flags.PrioritySpeaker,
                  PermissionsBitField.Flags.UseApplicationCommands,
                  PermissionsBitField.Flags.UseEmbeddedActivities,
                  PermissionsBitField.Flags.RequestToSpeak,
                  PermissionsBitField.Flags.CreateEvents,
                  PermissionsBitField.Flags.ManageEvents,
                ],
                deny: [PermissionsBitField.Flags.ManageChannels,
                PermissionsBitField.Flags.ManageRoles,
                PermissionsBitField.Flags.ManageWebhooks,
                PermissionsBitField.Flags.ManageMessages,
                PermissionsBitField.Flags.MuteMembers,
                PermissionsBitField.Flags.DeafenMembers,
                PermissionsBitField.Flags.MoveMembers,
                ]
              },
              {
                id: role.id,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.EmbedLinks,
                  PermissionsBitField.Flags.AttachFiles,
                  PermissionsBitField.Flags.AddReactions,
                  PermissionsBitField.Flags.UseExternalEmojis,
                  PermissionsBitField.Flags.UseExternalStickers,
                  PermissionsBitField.Flags.MentionEveryone,
                  PermissionsBitField.Flags.ReadMessageHistory,
                  PermissionsBitField.Flags.SendTTSMessages,
                  PermissionsBitField.Flags.SendVoiceMessages,
                  PermissionsBitField.Flags.Connect,
                  PermissionsBitField.Flags.Speak,
                  PermissionsBitField.Flags.Stream,
                  PermissionsBitField.Flags.UseSoundboard,
                  PermissionsBitField.Flags.UseExternalSounds,
                  PermissionsBitField.Flags.UseApplicationCommands,
                  PermissionsBitField.Flags.UseEmbeddedActivities,
                  PermissionsBitField.Flags.RequestToSpeak,

                ],
                deny: [
                  PermissionsBitField.Flags.ManageChannels,
                  PermissionsBitField.Flags.ManageRoles,
                  PermissionsBitField.Flags.ManageWebhooks,
                  PermissionsBitField.Flags.CreateInstantInvite,
                  PermissionsBitField.Flags.SendMessagesInThreads,
                  PermissionsBitField.Flags.CreatePublicThreads,
                  PermissionsBitField.Flags.CreatePrivateThreads,
                  PermissionsBitField.Flags.ManageMessages,
                  PermissionsBitField.Flags.ManageThreads,
                  PermissionsBitField.Flags.PrioritySpeaker,
                  PermissionsBitField.Flags.MuteMembers,
                  PermissionsBitField.Flags.DeafenMembers,
                  PermissionsBitField.Flags.MoveMembers,
                  PermissionsBitField.Flags.CreateEvents,
                  PermissionsBitField.Flags.ManageEvents,
                ]
              },
              {
                id: interaction.guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel]
              }]
        })
      })
      .catch(error => {interaction.editReply(`coś zawiodło`); console.log(error)});

      interaction.editReply(`stworzono klasę ${grade}!`)
  },
};
