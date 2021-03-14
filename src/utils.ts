import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Config } from './typings';

export const randomColour = (): number => {
  return Math.floor(Math.random() * 0xffffff);
};

export const loadConfig = (): Config =>
  JSON.parse(readFileSync(resolve(__dirname, '..', 'config.json'), 'utf8'));

export const getAvatarURL = (userID: string, avatarHash: string): string =>
  `https://cdn.discordapp.com/avatars/${userID}/${avatarHash}.${
    avatarHash.startsWith('a_') ? 'gif' : 'png'}?=1024`;

export const prettyDate = (): string => {
  const d = new Date();
  return `${['getHours', 'getMinutes', 'getSeconds'].map(e => 
    d[e]().toString().padStart(2, '0')
  ).join(':')} —— ${d.toDateString()}`;
};