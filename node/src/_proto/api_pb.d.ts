// package: api
// file: api.proto

import * as jspb from "google-protobuf";

export class MineRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MineRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MineRequest): MineRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MineRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MineRequest;
  static deserializeBinaryFromReader(message: MineRequest, reader: jspb.BinaryReader): MineRequest;
}

export namespace MineRequest {
  export type AsObject = {
    id: string,
  }
}

export class MineReply extends jspb.Message {
  getAmount(): number;
  setAmount(value: number): void;

  getIndex(): number;
  setIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MineReply.AsObject;
  static toObject(includeInstance: boolean, msg: MineReply): MineReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MineReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MineReply;
  static deserializeBinaryFromReader(message: MineReply, reader: jspb.BinaryReader): MineReply;
}

export namespace MineReply {
  export type AsObject = {
    amount: number,
    index: number,
  }
}

export class TxItem extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getTo(): string;
  setTo(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxItem.AsObject;
  static toObject(includeInstance: boolean, msg: TxItem): TxItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxItem;
  static deserializeBinaryFromReader(message: TxItem, reader: jspb.BinaryReader): TxItem;
}

export namespace TxItem {
  export type AsObject = {
    from: string,
    to: string,
    amount: number,
  }
}

export class PendingTxsReply extends jspb.Message {
  clearQueueList(): void;
  getQueueList(): Array<TxItem>;
  setQueueList(value: Array<TxItem>): void;
  addQueue(value?: TxItem, index?: number): TxItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PendingTxsReply.AsObject;
  static toObject(includeInstance: boolean, msg: PendingTxsReply): PendingTxsReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PendingTxsReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PendingTxsReply;
  static deserializeBinaryFromReader(message: PendingTxsReply, reader: jspb.BinaryReader): PendingTxsReply;
}

export namespace PendingTxsReply {
  export type AsObject = {
    queueList: Array<TxItem.AsObject>,
  }
}

export class SendTxReply extends jspb.Message {
  getPending(): number;
  setPending(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendTxReply.AsObject;
  static toObject(includeInstance: boolean, msg: SendTxReply): SendTxReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendTxReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendTxReply;
  static deserializeBinaryFromReader(message: SendTxReply, reader: jspb.BinaryReader): SendTxReply;
}

export namespace SendTxReply {
  export type AsObject = {
    pending: number,
  }
}

export class BalanceRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceRequest): BalanceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceRequest;
  static deserializeBinaryFromReader(message: BalanceRequest, reader: jspb.BinaryReader): BalanceRequest;
}

export namespace BalanceRequest {
  export type AsObject = {
    id: string,
  }
}

export class BalanceReply extends jspb.Message {
  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceReply.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceReply): BalanceReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceReply;
  static deserializeBinaryFromReader(message: BalanceReply, reader: jspb.BinaryReader): BalanceReply;
}

export namespace BalanceReply {
  export type AsObject = {
    amount: number,
  }
}

export class PingRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingRequest;
  static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
  export type AsObject = {
    name: string,
  }
}

export class PingReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingReply.AsObject;
  static toObject(includeInstance: boolean, msg: PingReply): PingReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingReply;
  static deserializeBinaryFromReader(message: PingReply, reader: jspb.BinaryReader): PingReply;
}

export namespace PingReply {
  export type AsObject = {
    message: string,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

