import { ApiService } from './_proto/api_grpc_pb';

import {
  PingReply, PingRequest, BalanceRequest, BalanceReply, TxItem,
  SendTxReply, PendingTxsReply, Empty, MineRequest, MineReply, FindTxsRequest, FindTxsReply,
} from './_proto/api_pb';
import { Server, ServerCredentials } from 'grpc';
import { Chain } from '@src/libdummy/chain';
import { MemoryStore } from '@src/libdummy/memory-store';
import { ITx } from '@src/libdummy/block';
import { Ctx } from '@src/ctx';

const MINER_REWARD = 100;

/**
 * Our application as a separate class for testing purposes
 * Uses hardcoded Chain instance with in-memory storage. For real world this should be injected
 */
export class App {
  grpcServer = new Server();
  chain = new Chain(new MemoryStore());
  txQueue: ITx[] = [];

  constructor() { this.registerHandlers(); }

  async findTxs(ctx: Ctx<FindTxsRequest, FindTxsReply>) {
    const reply = new FindTxsReply();
    const txs = await this.chain.findTxs(ctx.req.getId());
    reply.setQueueList(txsToItems(txs));
    ctx.ok(reply);
  }

  async mine(ctx: Ctx<MineRequest, MineReply>) {
    const minerId = ctx.req.getId();
    const minerTx = { from: 'SYSTEM', to: minerId, amount: MINER_REWARD };
    const block = await this.chain.addTxs([...this.txQueue, minerTx]);
    this.txQueue = [];
    const reply = new MineReply();
    reply.setIndex(block.index);
    reply.setAmount(await this.chain.getBalance(minerId));
    ctx.ok(reply);
  }

  async pendingTxs(ctx: Ctx<Empty, PendingTxsReply>) {
    const reply = new PendingTxsReply();
    reply.setQueueList(txsToItems(this.txQueue));
    ctx.ok(reply);
  }

  async sendTx(ctx: Ctx<TxItem, SendTxReply>) {
    const reply = new SendTxReply();
    this.txQueue.push(ctx.req.toObject());
    reply.setPending(this.txQueue.length);
    ctx.ok(reply);
  }

  async getBalance(ctx: Ctx<BalanceRequest, BalanceReply>) {
    const reply = new BalanceReply();
    const id = ctx.req.getId();
    const balance = await this.chain.getBalance(id);
    reply.setAmount(balance);
    ctx.ok(reply);
  }

  sendPing(ctx: Ctx<PingRequest, PingReply>) {
    const reply = new PingReply();
    reply.setMessage('Pong ' + ctx.req.getName());
    ctx.ok(reply);
  }

  registerHandlers() {
    this.grpcServer.addService(ApiService, Ctx.wrapImplementation(this, {
      sendPing: this.sendPing,
      getBalance: this.getBalance,
      sendTx: this.sendTx,
      pendingTxs: this.pendingTxs,
      mine: this.mine,
      findTxs: this.findTxs,
    }));
  }

  start(host: string, port: number) {
    const actualPort = this.grpcServer.bind(`${host}:${port}`, ServerCredentials.createInsecure());
    this.grpcServer.start();
    return actualPort;
  }
}

function txsToItems(txs: ITx[]) {
  return txs.map(tx => {
    const txi = new TxItem();
    txi.setAmount(tx.amount);
    txi.setFrom(tx.from);
    txi.setTo(tx.to);
    return txi;
  });
}
