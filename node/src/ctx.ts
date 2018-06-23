import { ServerUnaryCall, sendUnaryData, handleCall } from 'grpc';

/** Ctx is class to wrap GRPC call and callback and make life easier */
export class Ctx<Req, Reply> {
  constructor(public call: ServerUnaryCall<Req>, public callback: sendUnaryData<Reply>) { }
  get req() { return this.call.request; }

  /** send reply with null error */
  ok(reply: Reply) { this.callback(null, reply); }

  /**
   * to avoid cumbersome definitions like
   * sendPing = (call: ServerUnaryCall<PingRequest>, callback: sendUnaryData<PingReply>) => {
   */
  static wrapMethod(app: object, meth: (ctx: Ctx<any, any>) => void): handleCall<any, any> {
    meth = meth.bind(app);
    return (call: any, callback: any) => meth(new Ctx(call, callback));
  }

  /** return object remapped with wrapMethod */
  static wrapImplementation(app: object, ctxDef: { [k: string]: ctxHandleCall }) {
    const def: { [k: string]: handleCall<any, any> } = {};
    Object.keys(ctxDef).forEach(k => def[k] = Ctx.wrapMethod(app, ctxDef[k]));
    return def;
  }
}

type ctxHandleCall<Req = any, Reply = any> = (ctx: Ctx<Req, Reply>) => void;
