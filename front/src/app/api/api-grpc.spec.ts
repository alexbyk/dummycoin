import { TestBed, inject } from '@angular/core/testing';

import { ApiGrpc } from './api-grpc';
import { throwError, of } from 'rxjs';

describe('ApiGrpc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGrpc]
    });
  });

  it('should increase and decrease counter on success', async () => {
    const api: ApiGrpc = TestBed.get(ApiGrpc);
    spyOn(api, 'grpcWithoutCounter').and.callFake(() => {
      expect(api.counter).toBe(1);
      return of(null);
    });
    await api.ping().toPromise();
    expect(api.counter).toBe(0);
  });

  it('should increase and decrease counter on error', () => {
    const api: ApiGrpc = TestBed.get(ApiGrpc);
    spyOn(api, 'grpcWithoutCounter').and.returnValue(throwError('Foo'));
    api.ping().subscribe(null, err => { });
    expect(api.counter).toBe(0);
  });
});
