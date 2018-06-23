import { IStore } from '@src/libdummy/store.interface';
import { Block, ITx } from '@src/libdummy/block';

/**
 * Chain is responsible for blockchain consistency and manipulations
 * For simplicity, consensus is literally 'pich only one branch'
 * A balance is calculated by iteration the whole chain. There are no transactions
 * signs and checks. User can spend money he doesn't own.
 *
 * Chain can use any storage, that satisfies IStore interface.
 */
export class Chain {

  constructor(private store: IStore) { }

  /**
   * Return the longest valid part of previously stored array,
   * storing genesis block if the array is empty
   */
  async load() {
    return Chain.selectValidBlocks(await this.loadFromStore());
  }

  /** Load chain and invoke function for each tx in each block */
  private async forAllTxs(fn: (tx: ITx) => void) {
    (await this.load()).forEach(block => block.getData().forEach(fn));
  }

  /** Return all txs where id is in of or from field */
  async findTxs(id: string) {
    const res: ITx[] = [];
    await this.forAllTxs(tx => (tx.from === id || tx.to === id) && res.push(tx));
    return res;
  }

  /** Return the balance of the given purse */
  async getBalance(id: string) {
    let sum = 0;
    await this.forAllTxs(tx => {
      if (tx.from === id) sum -= tx.amount;
      if (tx.to === id) sum += tx.amount;
    });
    return sum;
  }

  /** Check chains and store the longest valid chain */
  async consensus(...arr: Block[][]) {
    let longest = await this.load();
    arr.map(blocks => Chain.selectValidBlocks(blocks)).forEach(blocks => {
      if (blocks.length > longest.length) longest = blocks;
    });
    await this.store.save(longest);
    return longest;
  }

  private async loadFromStore() {
    const data = await this.store.load();
    if (data.length) return data;

    // if is empty, fill with genesis block
    await this.store.save([Chain.genesis()]);
    return this.store.load();
  }

  /**
   * calculate pow, create a block and add the block to the end of the chain
   * @return the recently generated block
   */
  async addTxs(data: ITx[]): Promise<Block> {
    const blocks = await this.load();
    const next = blocks[blocks.length - 1].genNextBlock(data);
    return (await this.store.appendBlock(next)).slice(-1)[0];
  }

  static genesis() {
    const start = new Date('2018-06-19T00:00:00Z');
    return Block.createGenesisBlock(start.getTime());
  }

  /** Find the longest chain that is valid */
  static selectValidBlocks(data: Block[]) {
    for (let i = 1; i < data.length; i++) {
      if (!data[i - 1].validateChild(data[i])) return data.slice(0, i);
    }
    return data;
  }
}
