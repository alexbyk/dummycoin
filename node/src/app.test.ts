import { Tester } from '@src/micro/tester';
import { ApiClient } from '@src/_proto/api_grpc_pb';
import {
  PingRequest, PingReply, BalanceRequest,
  BalanceReply, TxItem, SendTxReply, PendingTxsReply, Empty, MineRequest, MineReply, FindTxsRequest, FindTxsReply,
} from '@src/_proto/api_pb';
import { Client } from 'grpc';
import { App } from '@src/app';

/** Functional test that ensures everything works as expected */

let tester: Tester<App>;
let client: Client;

beforeEach(() => {
  tester = new Tester(new App());
  client = tester.buildClient(ApiClient);
});
afterAll(() => { tester.shutdown(); });

async function getBalance(id: string) {
  const reqBalance = new BalanceRequest();
  reqBalance.setId(id);
  const repl = await tester.promisify<BalanceReply>(client, 'getBalance')(reqBalance);
  return repl.getAmount();
}

async function sendTx(from: string, to: string, amount: number) {
  const reqTx = new TxItem();
  reqTx.setTo(to);
  reqTx.setFrom(from);
  reqTx.setAmount(amount);
  const replTx = await tester.promisify<SendTxReply>(client, 'sendTx')(reqTx);
  return replTx.getPending();
}

async function pendingTxs() {
  const repl = await tester.promisify<PendingTxsReply>(client, 'pendingTxs')(new Empty());
  return repl.getQueueList();
}

async function mine(id: string) {
  const mineReq = new MineRequest();
  mineReq.setId(id);
  const mineReply = await tester.promisify<MineReply>(client, 'mine')(mineReq);
  return mineReply;
}

test('ping', async () => {
  const req = new PingRequest();
  req.setName('Foo');
  const repl = await tester.promisify<PingReply>(client, 'sendPing')(req);
  expect(repl.getMessage()).toBe('Pong Foo');
});

test('roundtip', async () => {
  const chain = tester.app.chain;

  // initial
  expect(await getBalance('foo')).toBe(0);
  expect(await pendingTxs()).toEqual([]);

  // other1 -> foo, 2 coins
  expect(await sendTx('other1', 'foo', 2)).toBe(1);
  expect(await getBalance('foo')).toBe(0);
  const txs = (await pendingTxs());
  expect(txs[0].getFrom()).toEqual('other1');
  expect(txs[0].getTo()).toEqual('foo');
  expect(txs[0].getAmount()).toEqual(2);
  expect(txs.length).toEqual(1);

  // mine block
  let mineReply = await mine('miner');
  expect(mineReply.getAmount()).toBe(100);
  expect(mineReply.getIndex()).toBe(1);
  expect(await getBalance('foo')).toBe(2);
  expect(await getBalance('miner')).toBe(100);
  expect((await pendingTxs()).length).toBe(0);

  // mine empty block again
  mineReply = await mine('miner');
  expect(mineReply.getAmount()).toBe(200);
  expect(mineReply.getIndex()).toBe(2);
});

test('findTxs', async () => {
  await sendTx('foo', 'bar', 2);
  await sendTx('other', 'foo', 2);
  await sendTx('bad', 'bad', 2);
  await mine('miner');
  const req = new FindTxsRequest();
  req.setId('foo');
  const repl = await tester.promisify<FindTxsReply>(client, 'findTxs')(req);
  expect(repl.getQueueList().length).toBe(2);
});
