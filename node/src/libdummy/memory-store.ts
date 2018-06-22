import { IStore } from '@src/libdummy/store.interface';
import { Block } from '@src/libdummy/block';

export class MemoryStore implements IStore {
  private data: Block[] = [];

  async save(blocks: Block[]) {
    this.data = blocks;
  }
  async load() { return this.data; }

  async appendBlock(block: Block) {
    this.data.push(block);
    return this.data;
  }
}
