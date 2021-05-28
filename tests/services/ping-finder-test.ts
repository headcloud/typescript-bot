import { expect } from 'chai';
import { PingFinder } from '../../src/services/ping-finder.js';

describe('PingFinder', () => {
  let service: PingFinder;

  beforeEach(() => {
    service = new PingFinder();
  });

  it('should find "ping" in the string', () => {
    expect(service.isPingContained('ping')).to.be.true;
  });
});
