// import type { context } from '@typings';
// import { sampleSize } from 'lodash';
// import GenericTask from './genericTask';
// import { randomColour, log, sleep } from '@utils';

// export default class Giveaways extends GenericTask {
//   interval = '*/30 * * * *'; // every 30th minute

//   async task(this: context): Promise<null> {
//     const giveaways = await this.db.giveaways.getActive();
//     if (!giveaways || !giveaways.length) {
//       return null;
//     }

//     for await (const giveaway of giveaways) {
//       await sleep(5 * 1000);
//       if (this.giveaways.has(giveaway._id)) {
//         return null;
//       }
//       this.giveaways.set(giveaway._id, giveaway);
//       const {
//         _id: msgID,
//         channelID,
//         endsAt,
//         msgLink,
//         createdBy,
//         guild,
//         rewardInfo,
//         info: { winners, type, amount, itemID }
//       } = giveaway;

//       log(
//         `[INFO] Restarting ${type} giveaway in ${guild.name} by ${createdBy.tag}`
//       );
//       const message = await this.client.getMessage(channelID, msgID);

//       const collector = await message.createButtonCollector({
//         time: (endsAt - Date.now()) / 1000
//       });

//       collector.on('collect', async (interaction) => {
//         const participants = await this.db.giveaways.getParticipants(
//           message.id
//         );
//         if (participants.includes(interaction.userID)) {
//           return interaction.reply({
//             content: "You've already joined this giveaway.",
//             flags: 64
//           });
//         }
//         await this.db.giveaways.addEntry(message.id, interaction.userID);
//         return interaction.reply({
//           content: "You've successfully joined the giveaway!",
//           flags: 64
//         });
//       });

//       collector.once('end', async () => {
//         log(`[INFO] ${type} giveaway in ${guild.name} ended`);
//         this.giveaways.delete(message.id);
//         await this.db.giveaways.end(message.id);
//         const newParticipants = await this.db.giveaways.getParticipants(
//           message.id
//         );
//         let giveawayWinners = [];
//         if (newParticipants.length <= 1) {
//           await this.client.send(
//             channelID,
//             `Not enough people entered the giveaway (\`${newParticipants.length}\`), so no one won <a:RIP:855528566450814996>`
//           );
//           return null;
//         }

//         giveawayWinners = sampleSize(newParticipants, winners);
//         const winnerMentions = giveawayWinners
//           .map((userID) => `<@${userID}>`)
//           .join(', ');

//         const userInfo = [];
//         await Promise.all(
//           giveawayWinners.map(async (userID) => {
//             switch (type) {
//               case 'coins':
//                 await this.db.banks.addPocket(userID, +amount);
//                 break;
//               case 'items':
//                 await this.db.users.updateItemAmount(userID, itemID, +amount);
//                 break;
//               default:
//                 return null;
//             }
//             const user = await this.client.getRESTUser(userID);
//             userInfo.push(`**${user.tag}** - \`${userID}\``);
//           })
//         );

//         await this.client.send(channelID, {
//           content: `Congratulations ${winnerMentions}. You have won:\n${rewardInfo}`,
//           embeds: [
//             {
//               description: `**${newParticipants.length}** people entered [↗](${msgLink})`,
//               color: 3553599
//             }
//           ]
//         });
//         await message.edit(
//           `**This giveaway has ended!**\nWinner(s): ${winnerMentions}`
//         );
//         await this.client
//           .sendDM(createdBy.id, {
//             embeds: [
//               {
//                 title: `Your ${type} giveaway in ${guild.name} has ended!`,
//                 description: `**[Link](${msgLink})**\n${rewardInfo}\n\nWinners:\n${userInfo
//                   .map((user, index) => `${index + 1}. ${user}`)
//                   .join('\n')}`,
//                 color: randomColour(),
//                 timestamp: new Date()
//               }
//             ]
//           })
//           .catch((err: Error) =>
//             log(`[ERROR] sending giveaway result DM: ${err.message}`)
//           );
//       });
//     }
//     return null;
//   }

//   start(context: context): void {
//     log(`[INFO] Started giveaway task.`);
//     super.start(context);
//   }
// }
