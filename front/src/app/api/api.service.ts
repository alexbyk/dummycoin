import { Injectable } from '@angular/core';
import { ApiGrpc } from './api-grpc';
import { BalanceRequest } from '@src/_proto/api_pb';
import { Api } from '@src/_proto/api_pb_service';
import { map } from 'rxjs/operators';

const KEY = 'DUMMYCOIN_ID';

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


  /** Get a balance for specified id */
  getBalance(id: string = this.id) {
    const request = new BalanceRequest();
    request.setId(id);
    return this.grpc(Api.GetBalance, request)
      .pipe(map(v => v.getAmount()));
  }

}
