import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { diTokens } from './di-tokens.js';
import { MessageResponder } from './services/message-responder.js';

@injectable()
export class Bot {
  private readonly _authToken: string;
  private readonly _client: Client;
  private readonly _messageResponder: MessageResponder;

  constructor(
    @inject(diTokens.authToken) authToken: string,
    @inject(diTokens.client) client: Client,
    @inject(diTokens.messageResponder) responder: MessageResponder
  ) {
    this._authToken = authToken;
    this._client = client;
    this._messageResponder = responder;
  }

  public listen(): Promise<string> {
    this._client.on('message', (message: Message) => {
      if (message.author.bot) {
        console.log('Ignore messages from bot');
        return;
      }

      console.log(`Message received: '${message.content}'`);

      this._messageResponder
        .handleMessage(message)
        .then(() => {
          console.log('Message responded');
        })
        .catch(() => {
          console.log('Unable to respond');
        });
    });

    return this._client.login(this._authToken);
  }
}
