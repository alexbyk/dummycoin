import { Server, ServerCredentials } from 'grpc';

export abstract class Application {

  grpcServer = new Server();

  constructor() { this.registerHandlers(); }

  /** Register handler for grpcServer */
  abstract registerHandlers(): void;

  start(host: string, port: number) {
    const actualPort = this.grpcServer
      .bind(`${host}:${port}`, ServerCredentials.createInsecure());
    this.grpcServer.start();
    return actualPort;
  }
}
