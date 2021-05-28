import { expect } from 'chai';
import { Message } from 'discord.js';
import { describe } from 'mocha';
import {
  anyString,
  instance,
  mock,
  resetCalls,
  verify,
  when,
} from 'ts-mockito';
import { MessageResponder } from '../../src/services/message-responder.js';
import { PingFinder } from '../../src/services/ping-finder.js';
import { createMessageResponder } from './message-responder-helper.js';

describe('MessageResponder', () => {
  let pingFinderMock: PingFinder;
  let messageMock: Message;
  let messageResponder: MessageResponder;

  before(() => {
    pingFinderMock = mock(PingFinder);
    messageMock = mock(Message);
    messageResponder = createMessageResponder({
      pingFinder: instance(pingFinderMock),
    });
  });

  beforeEach(() => {
    resetCalls(messageMock);
  });

  it('should  call reply("pong") on passed message if pingFinder found "ping"', async () => {
    when(pingFinderMock.isPingContained(anyString())).thenReturn(true);
    when(messageMock.content).thenReturn('');

    await messageResponder.handleMessage(instance(messageMock));

    verify(messageMock.reply('pong')).once();
  });

  it('should not call reply on passed message if pingFinder not found "ping"', async () => {
    when(pingFinderMock.isPingContained(anyString())).thenReturn(false);
    when(messageMock.content).thenReturn('');

    await messageResponder
      .handleMessage(instance(messageMock))
      .then(() => {
        // Successful promise is unexpected, so we fail the test
        expect.fail('Unexpected promise');
      })
      .catch(() => {
        // Rejected promise is expected, so nothing happens here
      });

    verify(messageMock.reply(anyString())).never();
  });
});
