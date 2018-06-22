// package: api
// file: api.proto

import * as api_pb from "./api_pb";
import {grpc} from "grpc-web-client";

type PingerSendPing = {
  readonly methodName: string;
  readonly service: typeof Pinger;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.PingRequest;
  readonly responseType: typeof api_pb.PingReply;
};

export class Pinger {
  static readonly serviceName: string;
  static readonly SendPing: PingerSendPing;
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

export class PingerClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  sendPing(
    requestMessage: api_pb.PingRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_pb.PingReply|null) => void
  ): void;
  sendPing(
    requestMessage: api_pb.PingRequest,
    callback: (error: ServiceError, responseMessage: api_pb.PingReply|null) => void
  ): void;
}

