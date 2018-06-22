import { Injectable } from '@angular/core';
import { ApiGrpc } from './api-grpc';
import { BalanceRequest } from '../../_proto/api_pb';
import { Api } from '../../_proto/api_pb_service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends ApiGrpc {

  /** Get a balance for specified id */
  getBalance(id: string) {
    const request = new BalanceRequest();
    request.setId(id);
    return this.grpc(Api.GetBalance, request);
  }

}
