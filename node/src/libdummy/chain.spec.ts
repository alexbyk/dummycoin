import { Chain } from '@src/libdummy/chain';
import { Block } from '@src/libdummy/block';
import { MemoryStore } from '@src/libdummy/memory-store';

function createChain() {
  return new Chain(new MemoryStore());
}

test('initial load', async () => {
  const chain = createChain();
  const blocks = await chain.load();
  expect(blocks.length).toBe(1);
});

test('selectValidBlocks', () => {
  const gb = Chain.genesis();
  const child = gb.genNextBlock([]);

  const tests = [
    { data: [gb], expect: 1 },
    { data: [gb, gb], expect: 1 },
    { data: [gb, child, child.genNextBlock([])], expect: 3 },
    { data: [gb, child, gb.genNextBlock([])], expect: 2 }, // not in chain
  ];

  tests.forEach(t => expect(Chain.selectValidBlocks(t.data).length).toBe(t.expect));
});

test('addTxs', async () => {
  const chain = createChain();
  const block = await chain.addTxs([{ from: 'foo', to: 'bar', amount: 2 }]);
  expect(block.index).toBe(1);
  expect(block.getData()[0].amount).toBe(2);
});

test('getBalance', async () => {
  const chain = createChain();
  await chain.addTxs([{ from: 'foo', to: 'bar', amount: 3 }]);
  await chain.addTxs([
    { from: 'bar', to: 'baz', amount: 1 },
    { from: 'foo', to: 'bar', amount: 1 },
  ]);
  await chain.addTxs([
    { from: 'baz', to: 'baz', amount: 1 },
  ]);
  expect(await chain.getBalance('bar')).toBe(3 + 1 - 1);
  expect(await chain.getBalance('baz')).toBe(1);
});

test('consensus', async () => {
  const chain1 = createChain();
  const chain2 = createChain();
  await chain1.addTxs([]);
  await Promise.all(Array(3).fill(null).map(_ => chain2.addTxs([])));

  expect((await chain1.load()).length).toBe(1 + 1);
  await chain1.consensus(await chain2.load());
  expect((await chain1.load()).length).toBe(3 + 1);
});

test('findTxs', async () => {
  const chain = createChain();
  const txs = [
    { from: 'foo', to: 'bar', amount: 1 },
    { from: 'baz', to: 'foo', amount: 1 },
    { from: 'other', to: 'other2', amount: 1 },
  ];
  await chain.addTxs([
    { from: 'foo', to: 'bar', amount: 1 },
    { from: 'baz', to: 'foo', amount: 1 },
    { from: 'other', to: 'other2', amount: 1 },
  ]);
  expect(await chain.findTxs('foo')).toEqual(txs.slice(0, 2));
});
