import { ApiService } from './_proto/api_grpc_pb';

const MINER_REWARD = 100;

import {
  PingReply, PingRequest, BalanceRequest, BalanceReply, TxItem,
  SendTxReply, PendingTxsReply, Empty, MineRequest, MineReply,
} from './_proto/api_pb';
import { Server, ServerCredentials, sendUnaryData, ServerUnaryCall } from 'grpc';
import { Chain } from '@src/libdummy/chain';
import { MemoryStore } from '@src/libdummy/memory-store';
import { ITx } from '@src/libdummy/block';

/**
 * Our application as a separate class for testing purposes
 * Uses hardcoded Chain instance with in-memory storage. For real world this should be injected
 */
export class App {
  grpcServer = new Server();
  chain = new Chain(new MemoryStore());
  txQueue: ITx[] = [];

  mine = async (call: ServerUnaryCall<MineRequest>, callback: sendUnaryData<MineReply>) => {
    const minerId = call.request.getId();
    const minerTx = { from: 'SYSTEM', to: minerId, amount: MINER_REWARD };
    const block = await this.chain.addTxs([...this.txQueue, minerTx]);
    this.txQueue = [];
    const reply = new MineReply();
    reply.setIndex(block.index);
    reply.setAmount(await this.chain.getBalance(minerId));
    callback(null, reply);
  }

  pendingTxs = async (call: ServerUnaryCall<Empty>, callback: sendUnaryData<PendingTxsReply>) => {
    const reply = new PendingTxsReply();
    const txs = this.txQueue.map(tx => {
      const txi = new TxItem();
      txi.setAmount(tx.amount);
      txi.setFrom(tx.from);
      txi.setTo(tx.to);
      return txi;
    });
    reply.setQueueList(txs);
    callback(null, reply);
  }

  sendTx = async (call: ServerUnaryCall<TxItem>, callback: sendUnaryData<SendTxReply>) => {
    const reply = new SendTxReply();
    this.txQueue.push(call.request.toObject());
    reply.setPending(this.txQueue.length);
    callback(null, reply);
  }

  getBalance = async (call: ServerUnaryCall<BalanceRequest>, callback: sendUnaryData<BalanceReply>) => {
    const reply = new BalanceReply();
    const id = call.request.getId();
    const balance = await this.chain.getBalance(id);
    reply.setAmount(balance);
    callback(null, reply);
  }

  sendPing = (call: ServerUnaryCall<PingRequest>, callback: sendUnaryData<PingReply>) => {
    const reply = new PingReply();
    reply.setMessage('Pong ' + call.request.getName());
    callback(null, reply);
  }

  start(host: string, port: number) {
    this.grpcServer.addService(ApiService, {
      sendPing: this.sendPing,
      getBalance: this.getBalance,
      sendTx: this.sendTx,
      pendingTxs: this.pendingTxs,
      mine: this.mine,
    });
    const actualPort = this.grpcServer.bind(`${host}:${port}`, ServerCredentials.createInsecure());
    this.grpcServer.start();
    return actualPort;
  }
}
