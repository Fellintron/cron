import type { EmbedOptions, WebhookPayload } from 'eris';
import type { Giveaway, LotteryResults, RestUser } from '../typings';
import { getAvatarURL, randomColour } from '../utils';

export const renderGiveaways = (giveaways: Giveaway[]): EmbedOptions => {
  let description = '';
  let number = 1;

  for (const giveaway of giveaways) {
    description += `${number}. In **${giveaway.guild.name}** — [↗️](${giveaway.msgLink})\n - ${giveaway.rewardInfo}\n\n`;
    number++;
  }
  return {
    title: 'Active Giveaways',
    description,
    timestamp: new Date(),
    color: randomColour(),
  };
};

export const renderHourlyEmbed = (
  results: LotteryResults,
  winner?: Partial<RestUser> & { wins: number },
): WebhookPayload => {
  if (!results) {
    return {
      content: 'No one entered the hourly lottery, how sad',
    };
  }

  const { amountWon, participantsCount, winnerID } = results;
  const usertag = `${winner.username}#${winner.discriminator}`;

  return {
    embeds: [
      {
        title: '🎟️ Hourly Lottery Winner!',
        description:
          `Winner: **${usertag}**\n` +
          `Amount: **\`${amountWon.toLocaleString()}\`** coins\n` +
          `Item: Lottery Ticket 🎟️\n\n` +
          `Total amount of users that entered: **${participantsCount}**\n` +
          `Total amount of lotteries won: **${winner.wins}**`,
        color: randomColour(),
        timestamp: new Date(),
        thumbnail: {
          url: getAvatarURL(winner.id, winner.avatar),
        },
      },
    ],
    content: `<@${winnerID}>`,
  };
};

export const renderDailyEmbed = (
  results: LotteryResults,
  winner?: Partial<RestUser> & { wins: number },
): WebhookPayload => {
  if (!results) {
    return {
      content: 'No one entered the daily lottery, how sad',
    };
  }

  const { amountWon, participantsCount, winnerID } = results;
  const usertag = `${winner.username}#${winner.discriminator}`;

  return {
    embeds: [
      {
        title: '🎟️ Daily Lottery Winner!',
        description:
          `Winner: **${usertag}**\n` +
          `Amount: **\`${amountWon.toLocaleString()}\`** coins\n` +
          `Item: Lottery Ticket 🎟️\n\n` +
          `Total amount of users that entered: **${participantsCount}**\n` +
          `Total amount of lotteries won: **${winner.wins}**`,
        color: 0,
        timestamp: new Date(),
        thumbnail: {
          url: getAvatarURL(winner.id, winner.avatar),
        },
      },
    ],
    content: `<@${winnerID}>`,
  };
};

export const renderWeeklyEmbed = (
  results: LotteryResults,
  winner?: Partial<RestUser> & { wins: number },
): WebhookPayload => {
  const { amountWon, participantsCount, winnerID } = results;
  const usertag = `${winner.username}#${winner.discriminator}`;

  return {
    embeds: [
      {
        title: '🎫 Weekly Lottery Winner!',
        description:
          `Winner: **${usertag}**\n` +
          `Amount: **\`${amountWon.toLocaleString()}\`** coins (using coupon item)\n` +
          `Item: Coupon 🎫\n\n` +
          `Total amount of users that entered: **${participantsCount}**\n` +
          `Total amount of lotteries won: **${winner.wins}**`,
        color: 0,
        timestamp: new Date(),
        thumbnail: {
          url: getAvatarURL(winner.id, winner.avatar),
        },
      },
    ],
    content: `<@${winnerID}>`,
  };
};
