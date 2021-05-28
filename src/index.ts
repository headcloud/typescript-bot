import 'dotenv/config';
import { Bot } from './bot.js';
import { diTokens } from './di-tokens.js';
import topLevelContainer from './inversify.config.js';

const bot = topLevelContainer.get<Bot>(diTokens.bot);

bot
  .listen()
  .then(() => {
    console.log('Logged in!');
  })
  .catch((error) => {
    console.log(`Login failed: ${error}`);
  });
