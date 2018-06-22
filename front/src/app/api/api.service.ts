import { Injectable } from '@angular/core';
import { ApiGrpc } from './api-grpc';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends ApiGrpc {
}
