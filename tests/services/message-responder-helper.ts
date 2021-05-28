import { instance, mock } from 'ts-mockito';
import { MessageResponder } from '../../src/services/message-responder.js';
import { PingFinder } from '../../src/services/ping-finder.js';

export function createMessageResponder(options?: {
  pingFinder?: PingFinder;
}): MessageResponder {
  return new MessageResponder(
    options?.pingFinder ?? instance(mock(PingFinder))
  );
}
