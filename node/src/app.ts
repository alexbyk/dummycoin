import { ApiService } from './_proto/api_grpc_pb';

import { PingReply, PingRequest, BalanceRequest, BalanceReply } from './_proto/api_pb';
import { Server, ServerCredentials, sendUnaryData, ServerUnaryCall } from 'grpc';
import { Chain } from '@src/libdummy/chain';
import { MemoryStore } from '@src/libdummy/memory-store';

/**
 * Our application as a separate class for testing purposes
 * Uses hardcoded Chain instance with in-memory storage. For real world this should be injected
 */
export class App {
  grpcServer = new Server();
  chain = new Chain(new MemoryStore());

  sendPing = (call: ServerUnaryCall<PingRequest>, callback: sendUnaryData<PingReply>) => {
    const reply = new PingReply();
    reply.setMessage('Pong ' + call.request.getName());
    callback(null, reply);
  }

  getBalance = async (call: ServerUnaryCall<BalanceRequest>, callback: sendUnaryData<BalanceReply>) => {
    const reply = new BalanceReply();
    const id = call.request.getId();
    const balance = await this.chain.getBalance(id);
    reply.setAmount(balance);
    callback(null, reply);
  }

  start(host: string, port: number) {
    this.grpcServer.addService(ApiService, {
      sendPing: this.sendPing,
      getBalance: this.getBalance,
    });
    const actualPort = this.grpcServer.bind(`${host}:${port}`, ServerCredentials.createInsecure());
    this.grpcServer.start();
    return actualPort;
  }
}
