import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { diTokens } from '../di-tokens.js';
import { PingFinder } from './ping-finder.js';

@injectable()
export class MessageResponder {
  private readonly _pingFinder: PingFinder;

  constructor(@inject(diTokens.pingFinder) pingFinder: PingFinder) {
    this._pingFinder = pingFinder;
  }

  public handleMessage(message: Message): Promise<Message | Message[]> {
    if (this._pingFinder.isPingContained(message.content)) {
      return message.reply('pong');
    }

    return Promise.reject();
  }
}
