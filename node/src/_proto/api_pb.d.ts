// package: api
// file: api.proto

import * as jspb from "google-protobuf";

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

