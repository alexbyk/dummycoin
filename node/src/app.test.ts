import { Tester, promisify } from '@src/tester';
import { PingerClient } from '@src/_proto/api_grpc_pb';
import { PingRequest, PingReply } from '@src/_proto/api_pb';

const tester = new Tester();
afterAll(() => { tester.shutdown(); });

test('tester', async () => {
  const client = tester.buildClient(PingerClient);
  const request = new PingRequest();
  request.setName('Foo');
  const resp = await promisify<PingReply>(client, 'sendPing')(request);
  expect(resp.getMessage()).toBe('Pong Foo');
});
