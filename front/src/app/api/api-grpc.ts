import { Observable, Observer, of } from 'rxjs';
import { UnaryOutput } from 'grpc-web-client/dist/unary';
import { ProtobufMessage } from 'grpc-web-client/dist/message';
import { UnaryMethodDefinition } from 'grpc-web-client/dist/service';
import { grpc } from 'grpc-web-client';
import { PingRequest } from '../../_proto/api_pb';
import { environment } from '../../environments/environment';
import { Pinger } from '../../_proto/api_pb_service';

import { tap, switchMap, finalize } from 'rxjs/operators';

/** An abstraction layer between an application and api */
export class ApiGrpc {

  host = environment.defaultApiHost;

  /** Count started but not finished requests */
  counter = 0;

  constructor() { }

  ping(name = 'DummyCoin Client') {
    const request = new PingRequest();
    request.setName(name);
    return this.grpc(Pinger.SendPing, request);
  }

  /** Wrap the method to the Observable, TS is smart enough to guess TReply from the method argument */
  grpcWithoutCounter<TReply extends ProtobufMessage, TRequest extends ProtobufMessage>
    (method: UnaryMethodDefinition<TRequest, TReply>, request: TRequest): Observable<TReply> {
    return grpcObservable(this.host, method, request);
  }

  /** Extend grpcWithoutCounter by increasing counter on start and decreasing it on end or error  */
  grpc<TReply extends ProtobufMessage, TRequest extends ProtobufMessage>
    (method: UnaryMethodDefinition<TRequest, TReply>, request: TRequest): Observable<TReply> {
    return of(null).pipe(
      tap(_ => this.counter++),
      switchMap(_ => this.grpcWithoutCounter(method, request)),
      finalize(() => this.counter--),
    );
  }

}

function grpcObservable<TReply extends ProtobufMessage, TRequest extends ProtobufMessage>
  (host: string, method: UnaryMethodDefinition<TRequest, TReply>, request: TRequest): Observable<TReply> {

  return new Observable((observer: Observer<TReply>) => {
    const onEnd = (res: UnaryOutput<TReply>) => {
      const { message } = res;
      if (res.status === grpc.Code.OK && message) {
        observer.next(message);
        observer.complete();
      } else {
        observer.error(res.statusMessage || 'Unknown error');
      }
    };

    const req = grpc.unary<TRequest, TReply, UnaryMethodDefinition<TRequest, TReply>>(method, { host, request, onEnd });
    return req.close; // cancel a request when subscriber unsubscribes
  });
}
