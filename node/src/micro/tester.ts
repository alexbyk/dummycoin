import { credentials, ChannelCredentials, Client } from 'grpc';
import { Application } from './application';

type ClientCTor<T> = new (address: string, credentials: ChannelCredentials) => T;

/** Promisify client method */

function promisify<TReply = any, TRequest = any>(client: any, key: string) {
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
export class Tester<TApp extends Application> {
  address: string;
  constructor(public app: TApp) {
    const port = this.app.start('localhost', 0);
    this.address = `localhost:${port}`;
  }

  buildClient<T = any>(ctor: ClientCTor<T>): T {
    return new ctor(this.address, credentials.createInsecure());
  }
  /** the same as function promisify but with type checking */

  promisify<TReply = any, TRequest = any>(client: any, key: keyof TApp) {
    return promisify<TReply, TRequest>(client, key as string);
  }

  shutdown() { this.app.grpcServer.forceShutdown(); }
}
