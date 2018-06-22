import { Tester, promisify } from '@src/tester';
import { ApiClient } from '@src/_proto/api_grpc_pb';
import { PingRequest, PingReply, BalanceRequest, BalanceReply } from '@src/_proto/api_pb';

const tester = new Tester();
afterAll(() => { tester.shutdown(); });

test('tester', async () => {
  const client = tester.buildClient(ApiClient);
  const req = new PingRequest();
  req.setName('Foo');
  const repl = await promisify<PingReply>(client, 'sendPing')(req);
  expect(repl.getMessage()).toBe('Pong Foo');
});

test('getBalance', async () => {
  const client = tester.buildClient(ApiClient);
  const chain = tester.app.chain;
  await chain.addTxs([{ from: 'external', to: 'foo', amount: 22 }]);

  const req = new BalanceRequest();
  req.setId('foo');
  const repl = await promisify<BalanceReply>(client, 'getBalance')(req);
  expect(repl.getAmount()).toBe(22);
});
