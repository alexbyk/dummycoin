import { ServerUnaryCall, sendUnaryData } from 'grpc';

/** Ctx is class to wrap GRPC call and callback and make life easier */
export class Ctx<Req, Reply> {
  constructor(public call: ServerUnaryCall<Req>, public callback: sendUnaryData<Reply>) { }
  get req() { return this.call.request; }

  /** send reply with null error */
  ok(reply: Reply) { this.callback(null, reply); }
}
