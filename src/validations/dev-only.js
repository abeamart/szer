module.exports = async(interaction, commandObj, handler, client) => {
    if (commandObj.devOnly) {

      if (await interaction.member.roles.cache.has('1149396887598813187') == false) {
        interaction.reply({content: 'ta komenda jest dostępna tylko dla moderatorów', ephemeral:true});
        return true; // This must be added to stop the command from being executed.
      }
    }
  };
  