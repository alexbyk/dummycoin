import { Injectable } from '@angular/core';
import { ApiGrpc } from './api-grpc';
import { BalanceRequest, Empty, FindTxsRequest, MineRequest, TxItem } from '@src/_proto/api_pb';
import { Api } from '@src/_proto/api_pb_service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const KEY = 'DUMMYCOIN_ID';

export interface ITxItemWithType {
  from: string;
  to: string;
  amount: number;
  type: 'in' | 'out';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService extends ApiGrpc {

  /** represents a user/wallet */
  id = 'dummy';

  constructor() {
    super();
    this.tryLoadId();
  }

  tryLoadId() {
    const id = localStorage.getItem(KEY);
    if (!!id) this.id = id;
  }

  changeId(id: string) {
    localStorage.setItem(KEY, id);
    this.id = id;
  }


  getBalance(id: string = this.id) {
    const request = new BalanceRequest();
    request.setId(id);
    return this.grpc(Api.GetBalance, request)
      .pipe(map(v => ({
        amount: v.getAmount(),
        pendingAmount: v.getPendingAmount(),
      })));
  }

  getPendingTxsCount() {
    return this.grpc(Api.PendingTxs, new Empty())
      .pipe(map(v => v.getQueueList().length));
  }

  findTxs(id: string = this.id): Observable<ITxItemWithType[]> {
    const req = new FindTxsRequest();
    req.setId(id);
    return this.grpc(Api.FindTxs, req)
      .pipe(map(v => v.getQueueList().map(tx => {
        const type = tx.getFrom() === id ? 'out' : 'in';
        const record: ITxItemWithType = {
          from: tx.getFrom(),
          to: tx.getTo(),
          amount: tx.getAmount(),
          type,
        };
        return record;
      })));
  }

  mine(minerId: string = this.id) {
    const req = new MineRequest();
    req.setId(minerId);
    return this.grpc(Api.Mine, req).pipe(
      map(repl => ({ index: repl.getIndex(), amount: repl.getAmount() })),
    );
  }

  sendTx(toId: string, amount: number) {
    const req = new TxItem();
    req.setTo(toId);
    req.setAmount(amount);
    req.setFrom(this.id);
    return this.grpc(Api.SendTx, req)
      .pipe(map(repl => repl.getPending()));
  }

}
