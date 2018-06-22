import { TestBed, inject } from '@angular/core/testing';

import { ApiGrpc } from './api-grpc';
import { Subject, throwError } from 'rxjs';

describe('ApiGrpc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGrpc]
    });
  });

  it('should increase and decrease counter on success', () => {
    const api: ApiGrpc = TestBed.get(ApiGrpc);
    const ob = new Subject();
    spyOn(api, 'grpcWithoutCounter').and.returnValue(ob);
    const sub = api.ping().subscribe();
    expect(api.counter).toBe(1);
    ob.next('Foo');
    ob.complete();
    expect(api.counter).toBe(0);
  });

  it('should increase and decrease counter on error', () => {
    const api: ApiGrpc = TestBed.get(ApiGrpc);
    spyOn(api, 'grpcWithoutCounter').and.returnValue(throwError('Foo'));
    const sub = api.ping().subscribe(null, err => { });
    expect(api.counter).toBe(0);
  });
});
