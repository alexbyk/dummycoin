// package: api
// file: api.proto

import * as api_pb from "./api_pb";
import {grpc} from "grpc-web-client";

type ApiGetBalance = {
  readonly methodName: string;
  readonly service: typeof Api;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.BalanceRequest;
  readonly responseType: typeof api_pb.BalanceReply;
};

type ApiSendPing = {
  readonly methodName: string;
  readonly service: typeof Api;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.PingRequest;
  readonly responseType: typeof api_pb.PingReply;
};

type ApiSendTx = {
  readonly methodName: string;
  readonly service: typeof Api;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.TxItem;
  readonly responseType: typeof api_pb.SendTxReply;
};

type ApiPendingTxs = {
  readonly methodName: string;
  readonly service: typeof Api;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.Empty;
  readonly responseType: typeof api_pb.PendingTxsReply;
};

type ApiMine = {
  readonly methodName: string;
  readonly service: typeof Api;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.MineRequest;
  readonly responseType: typeof api_pb.MineReply;
};

export class Api {
  static readonly serviceName: string;
  static readonly GetBalance: ApiGetBalance;
  static readonly SendPing: ApiSendPing;
  static readonly SendTx: ApiSendTx;
  static readonly PendingTxs: ApiPendingTxs;
  static readonly Mine: ApiMine;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class ApiClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  getBalance(
    requestMessage: api_pb.BalanceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_pb.BalanceReply|null) => void
  ): void;
  getBalance(
    requestMessage: api_pb.BalanceRequest,
    callback: (error: ServiceError, responseMessage: api_pb.BalanceReply|null) => void
  ): void;
  sendPing(
    requestMessage: api_pb.PingRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_pb.PingReply|null) => void
  ): void;
  sendPing(
    requestMessage: api_pb.PingRequest,
    callback: (error: ServiceError, responseMessage: api_pb.PingReply|null) => void
  ): void;
  sendTx(
    requestMessage: api_pb.TxItem,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_pb.SendTxReply|null) => void
  ): void;
  sendTx(
    requestMessage: api_pb.TxItem,
    callback: (error: ServiceError, responseMessage: api_pb.SendTxReply|null) => void
  ): void;
  pendingTxs(
    requestMessage: api_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_pb.PendingTxsReply|null) => void
  ): void;
  pendingTxs(
    requestMessage: api_pb.Empty,
    callback: (error: ServiceError, responseMessage: api_pb.PendingTxsReply|null) => void
  ): void;
  mine(
    requestMessage: api_pb.MineRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_pb.MineReply|null) => void
  ): void;
  mine(
    requestMessage: api_pb.MineRequest,
    callback: (error: ServiceError, responseMessage: api_pb.MineReply|null) => void
  ): void;
}

