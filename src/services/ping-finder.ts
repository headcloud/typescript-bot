import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export class PingFinder {
  private readonly _pingSearchPattern = 'ping';

  public isPingContained(input: string): boolean {
    return input.search(this._pingSearchPattern) >= 0;
  }
}
