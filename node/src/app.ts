import { PingerService } from './_proto/api_grpc_pb';

import { PingReply, PingRequest } from './_proto/api_pb';
import { Server, ServerCredentials, sendUnaryData, ServerUnaryCall } from 'grpc';

export class App {
  grpcServer = new Server();

  sendPing(call: ServerUnaryCall<PingRequest>, callback: sendUnaryData<PingReply>) {
    const reply = new PingReply();
    reply.setMessage('Pong ' + call.request.getName());
    callback(null, reply);
  }

  start(host: string, port: number) {
    this.grpcServer.addService(PingerService, { sendPing: this.sendPing });
    const actualPort = this.grpcServer.bind(`${host}:${port}`, ServerCredentials.createInsecure());
    this.grpcServer.start();
    return actualPort;
  }
}
