import { ApiService } from './_proto/api_grpc_pb';

import {
  PingReply, PingRequest, BalanceRequest, BalanceReply, TxItem,
  SendTxReply, PendingTxsReply, Empty, MineRequest, MineReply, FindTxsRequest, FindTxsReply,
} from './_proto/api_pb';
import { Server, ServerCredentials, sendUnaryData, ServerUnaryCall, handleCall } from 'grpc';
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

  async findTxs(ctx: Ctx<FindTxsRequest, FindTxsReply>) {
    const reply = new FindTxsReply();
    const txs = await this.chain.findTxs(ctx.call.request.getId());
    reply.setQueueList(txsToItems(txs));
    ctx.ok(reply);
  }

  async mine(ctx: Ctx<MineRequest, MineReply>) {
    const minerId = ctx.call.request.getId();
    const minerTx = { from: 'SYSTEM', to: minerId, amount: MINER_REWARD };
    const block = await this.chain.addTxs([...this.txQueue, minerTx]);
    this.txQueue = [];
    const reply = new MineReply();
    reply.setIndex(block.index);
    reply.setAmount(await this.chain.getBalance(minerId));
    ctx.callback(null, reply);
  }

  async pendingTxs(ctx: Ctx<Empty, PendingTxsReply>) {
    const reply = new PendingTxsReply();
    reply.setQueueList(txsToItems(this.txQueue));
    ctx.callback(null, reply);
  }

  async sendTx(ctx: Ctx<TxItem, SendTxReply>) {
    const reply = new SendTxReply();
    this.txQueue.push(ctx.call.request.toObject());
    reply.setPending(this.txQueue.length);
    ctx.callback(null, reply);
  }

  async getBalance(ctx: Ctx<BalanceRequest, BalanceReply>) {
    const reply = new BalanceReply();
    const id = ctx.call.request.getId();
    const balance = await this.chain.getBalance(id);
    reply.setAmount(balance);
    ctx.callback(null, reply);
  }

  sendPing(ctx: Ctx<PingRequest, PingReply>) {
    const reply = new PingReply();
    reply.setMessage('Pong ' + ctx.call.request.getName());
    ctx.callback(null, reply);
  }

  start(host: string, port: number) {
    this.grpcServer.addService(ApiService, this.wrapDefinition({
      sendPing: this.sendPing,
      getBalance: this.getBalance,
      sendTx: this.sendTx,
      pendingTxs: this.pendingTxs,
      mine: this.mine,
      findTxs: this.findTxs,
    }));
    const actualPort = this.grpcServer.bind(`${host}:${port}`, ServerCredentials.createInsecure());
    this.grpcServer.start();
    return actualPort;
  }

  /**
   * to avoid cumbersome definitions like
   * sendPing = (call: ServerUnaryCall<PingRequest>, callback: sendUnaryData<PingReply>) => {
   */
  wrapMethod(meth: (ctx: Ctx<any, any>) => void): handleCall<any, any> {
    meth = meth.bind(this);
    return (call: any, callback: any) => meth(new Ctx(call, callback));
  }

  wrapDefinition(ctxDef: { [k: string]: ctxHandleCall }) {
    const def: { [k: string]: handleCall<any, any> } = {};
    Object.keys(ctxDef).forEach(k => def[k] = this.wrapMethod(ctxDef[k]));
    return def;
  }
}

type ctxHandleCall<Req = any, Reply = any> = (ctx: Ctx<Req, Reply>) => void;

function txsToItems(txs: ITx[]) {
  return txs.map(tx => {
    const txi = new TxItem();
    txi.setAmount(tx.amount);
    txi.setFrom(tx.from);
    txi.setTo(tx.to);
    return txi;
  });
}
