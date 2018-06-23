import { App } from '@src/app';
import { credentials, ChannelCredentials } from 'grpc';

type ClientCTor<T> = new (address: string, credentials: ChannelCredentials) => T;

/** Promisify client method */

export function promisify<TReply = any, TRequest = any>(client: any, key: keyof App) {
  const fn = client[key].bind(client);
  return (request: TRequest) => {
    return new Promise<TReply>((resolve, reject) => {
      const cb = (err: Error, reply: TReply) => {
        if (err !== null) return reject(err);
        return resolve(reply);
      };
      fn(request, cb);
    });
  };
}

/** Tester makes testing easier */
export class Tester {
  app = new App();
  address: string;
  constructor() {
    const port = this.app.start('localhost', 0);
    this.address = `localhost:${port}`;
  }
  buildClient<T = any>(ctor: ClientCTor<T>): T {
    return new ctor(this.address, credentials.createInsecure());
  }

  shutdown() { this.app.grpcServer.forceShutdown(); }

}
