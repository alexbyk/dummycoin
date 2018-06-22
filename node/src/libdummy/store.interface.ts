import { Block } from '@src/libdummy/block';

export interface IStore {
  save(blocks: Block[]): Promise<void>;
  load(): Promise<Block[]>;
  appendBlock(block: Block): Promise<Block[]>;
}
