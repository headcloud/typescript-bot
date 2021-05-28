import { Client } from 'discord.js';
import { Container } from 'inversify';
import { Bot } from './bot.js';
import { diTokens } from './di-tokens.js';
import { MessageResponder } from './services/message-responder.js';
import { PingFinder } from './services/ping-finder.js';

let topLevelContainer = new Container();

topLevelContainer
  .bind<string>(diTokens.authToken)
  .toConstantValue(<string>process.env.TOKEN);

topLevelContainer.bind<Client>(diTokens.client).toConstantValue(new Client());

topLevelContainer
  .bind<PingFinder>(diTokens.pingFinder)
  .to(PingFinder)
  .inSingletonScope();

topLevelContainer
  .bind<MessageResponder>(diTokens.messageResponder)
  .to(MessageResponder)
  .inSingletonScope();

topLevelContainer.bind<Bot>(diTokens.bot).to(Bot).inSingletonScope();

export default topLevelContainer;
