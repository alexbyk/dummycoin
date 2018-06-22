import * as crypto from 'crypto';

/**
 * Block is a class responsible for building and validation of the particular block
 *
 * The POW is finding a number that will lead a hash to have a leading zero. For simplicity
 * the complexity is constant (one zero is enough)
 */

export interface ITx {
  from: string;
  to: string;
  amount: number;
}

/** Base is separated to calculate a pow */
interface IBlockBase {
  /** index of the block, needed to simplify consensus */
  index: number;

  /** milliseconds from epoch */
  timestamp: number;
  prevHash: string;

  /** json encoded list of transaction */
  data: string;
}

/** A full block structure */
export interface IBlock extends IBlockBase {
  pow: string;
  hash: string;
}

/** Block basic class */
export class Block implements IBlock {

  /** ms from epoch */
  readonly timestamp!: number;
  readonly data!: string;
  readonly index!: number;
  readonly prevHash!: string;
  readonly pow!: string;
  readonly hash!: string;

  constructor(opts: IBlock) { Object.assign(this, opts); } // for simplicity

  /** decode json and return an array of transactions */
  getData(): ITx[] {
    try { return JSON.parse(this.data); } catch (e) { return []; }
  }

  validate() { return Block.validate(this); }

  genNextBlock(txs: ITx[]) {
    const data = JSON.stringify(txs);
    const timestamp = (new Date()).getTime();
    const index = this.index + 1;
    const prevHash = this.hash;
    const base: IBlockBase = { data, index, prevHash, timestamp };
    const pow = Block.findPow(base);
    const hash = Block.genHash({ ...base, pow });
    return new Block({ ...base, hash, pow });
  }

  /** Validate if a given block is a valid child */
  validateChild(child: IBlock) {
    return Block.validate(child)
      && child.index === this.index + 1 && child.prevHash === this.hash;
  }

  static genHash(opts: IBlockBase & { pow: string }) {
    return Block.sha256(`${opts.index}-${opts.timestamp}-${opts.prevHash}-${opts.data}-${opts.pow}`);
  }

  static sha256(data: string) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  static checkPow(hash: string) { return hash && hash[0] === '0'; }

  static validate(bl: IBlock) {
    return Block.genHash(bl) === bl.hash && Block.checkPow(bl.hash);
  }

  /**
   * Generate a genesis block and return it
   * @param timestamp ms, identify a genesis block
   */
  static createGenesisBlock(timestamp: number) {
    const [index, prevHash, data] = [0, '', JSON.stringify([])];
    const opts = { index, timestamp, prevHash, data };
    const pow = Block.findPow(opts);
    const hash = Block.genHash({ ...opts, pow });
    return new Block({ ...opts, pow, hash });
  }

  /** Find the number and return it as a hex string */
  static findPow(base: IBlockBase): string {
    for (let cur = 0; ; cur++) {
      const hash = Block.genHash({ ...base, pow: cur.toString(16) });
      if (Block.checkPow(hash)) return cur.toString(16);
    }
  }
}
