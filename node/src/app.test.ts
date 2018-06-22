import { Tester, promisify } from '@src/tester';
import { ApiClient } from '@src/_proto/api_grpc_pb';
import {
  PingRequest, PingReply, BalanceRequest,
  BalanceReply, TxItem, SendTxReply, PendingTxsReply, Empty,
} from '@src/_proto/api_pb';

/** Functional test that ensures everything works as expected */

const tester = new Tester();
afterAll(() => { tester.shutdown(); });

const client = tester.buildClient(ApiClient);

async function getBalance(id: string) {
  const reqBalance = new BalanceRequest();
  reqBalance.setId(id);
  const repl = await promisify<BalanceReply>(client, 'getBalance')(reqBalance);
  return repl.getAmount();
}

async function sendTx(from: string, to: string, amount: number) {
  const reqTx = new TxItem();
  reqTx.setTo(to);
  reqTx.setFrom(from);
  reqTx.setAmount(amount);
  const replTx = await promisify<SendTxReply>(client, 'sendTx')(reqTx);
  return replTx.getPending();
}

async function pendingTxs() {
  const repl = await promisify<PendingTxsReply>(client, 'pendingTxs')(new Empty());
  return repl.getQueueList();
}

test('ping', async () => {
  const req = new PingRequest();
  req.setName('Foo');
  const repl = await promisify<PingReply>(client, 'sendPing')(req);
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
});
