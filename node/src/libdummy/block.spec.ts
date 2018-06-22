import { Block, ITx } from './block';

const meta = {
  index: 0,
  timestamp: new Date(0).getTime(),
  prevHash: 'mock',
};
const dataObj: ITx[] = [{ from: 'foo', to: 'bar', amount: 1 }];
const data = JSON.stringify(dataObj);
const pow = Block.findPow({ ...meta, data });
const hash = Block.genHash({ ...meta, pow, data });
const valid = { ...meta, pow, data, hash };

describe('Static methods', () => {
  test('sha256', () => {
    const myHash = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
    expect(Block.sha256('foo')).toBe(myHash);
  });

  test('should validate a block', () => {

    expect(Block.validate(valid)).toBe(true);

    // invalid hash
    let invalid = { ...valid, hash: 'bad' };
    expect(Block.validate(invalid)).toBe(false);

    // invalid pow
    invalid = { ...valid, pow: '44', hash: Block.genHash({ ...meta, pow: '44', data }) };
    expect(Block.validate(invalid)).toBe(false);

  });

  test('validateChild', () => {
    const gb = Block.createGenesisBlock((new Date(0)).getTime());
    const child = gb.genNextBlock(dataObj);
    expect(gb.validateChild(child)).toBe(true);
    expect(gb.validateChild(child.genNextBlock(dataObj))).toBe(false);

    // another chain
    const gb2 = Block.createGenesisBlock((new Date(1)).getTime());
    expect(gb.validateChild(gb2.genNextBlock(dataObj))).toBe(false);
  });

  test('Genesis block', () => {
    const gb = Block.createGenesisBlock((new Date()).getTime());
    expect(gb.index).toBe(0);
    expect(Block.validate(gb)).toBe(true);
  });

});

test('Should create a new block', () => {
  const block = new Block({ ...meta, data, pow, hash });
  expect(block.getData()).toEqual(dataObj);
  expect(block.validate()).toBe(true);
});

test('genNextBlock', () => {
  const next = new Block(valid).genNextBlock([]);
  expect(next.index).toBe(1);
  expect(next.prevHash).toBe(valid.hash);
  expect(next.validate()).toBe(true);
  expect(next.getData()).toEqual([]);
});
