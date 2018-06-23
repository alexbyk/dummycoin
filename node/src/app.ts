import { ApiService } from './_proto/api_grpc_pb';

import {
  PingReply, PingRequest, BalanceRequest, BalanceReply, TxItem,
  SendTxReply, PendingTxsReply, Empty, MineRequest, MineReply, FindTxsRequest, FindTxsReply,
} from './_proto/api_pb';
import { Server, ServerCredentials, sendUnaryData, ServerUnaryCall, handleCall } from 'grpc';
import { Chain } from '@src/libdummy/chain';
import { MemoryStore } from '@src/libdummy/memory-store';
import { ITx } from '@src/libdummy/block';

const MINER_REWARD = 100;

/**
 * Our application as a separate class for testing purposes
 * Uses hardcoded Chain instance with in-memory storage. For real world this should be injected
 */
export class App {
  grpcServer = new Server();
  chain = new Chain(new MemoryStore());
  txQueue: ITx[] = [];

  async findTxs(ctx: ICtx<FindTxsRequest, FindTxsReply>) {
    const reply = new FindTxsReply();
    const txs = await this.chain.findTxs(ctx.call.request.getId());
    reply.setQueueList(txsToItems(txs));
    ctx.callback(null, reply);
  }

  async mine(ctx: ICtx<MineRequest, MineReply>) {
    const minerId = ctx.call.request.getId();
    const minerTx = { from: 'SYSTEM', to: minerId, amount: MINER_REWARD };
    const block = await this.chain.addTxs([...this.txQueue, minerTx]);
    this.txQueue = [];
    const reply = new MineReply();
    reply.setIndex(block.index);
    reply.setAmount(await this.chain.getBalance(minerId));
    ctx.callback(null, reply);
  }

  async pendingTxs(ctx: ICtx<Empty, PendingTxsReply>) {
    const reply = new PendingTxsReply();
    reply.setQueueList(txsToItems(this.txQueue));
    ctx.callback(null, reply);
  }

  async sendTx(ctx: ICtx<TxItem, SendTxReply>) {
    const reply = new SendTxReply();
    this.txQueue.push(ctx.call.request.toObject());
    reply.setPending(this.txQueue.length);
    ctx.callback(null, reply);
  }

  async getBalance(ctx: ICtx<BalanceRequest, BalanceReply>) {
    const reply = new BalanceReply();
    const id = ctx.call.request.getId();
    const balance = await this.chain.getBalance(id);
    reply.setAmount(balance);
    ctx.callback(null, reply);
  }

  sendPing(ctx: ICtx<PingRequest, PingReply>) {
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
  wrapMethod(meth: (ctx: ICtx<any, any>) => void): handleCall<any, any> {
    meth = meth.bind(this);
    return (call: any, callback: any) => meth({ call, callback });
  }

  wrapDefinition(ctxDef: { [k: string]: ctxHandleCall }) {
    const def: { [k: string]: handleCall<any, any> } = {};
    Object.keys(ctxDef).forEach(k => def[k] = this.wrapMethod(ctxDef[k]));
    return def;
  }
}

type ctxHandleCall<Req = any, Reply = any> = (ctx: ICtx<Req, Reply>) => void;

interface ICtx<Req, Repl> {
  call: ServerUnaryCall<Req>;
  callback: sendUnaryData<Repl>;
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
