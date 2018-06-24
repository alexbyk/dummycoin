import { Subject } from 'rxjs';
import { State } from '@src/app/state';

describe('State', () => {
  it('initial', async () => {
    const sub = new Subject<string>();
    const state = State.fromObservable(sub);
    expect(state.data).toBe(null);
    expect(state.error).toBe(null);
    expect(state.ready).toBe(false);
  });

  it('success', async () => {
    const sub = new Subject<string>();
    const state = State.fromObservable(sub);
    sub.next('ok');
    sub.complete();
    expect(state.data).toBe('ok');
    expect(state.error).toBe(null);
    expect(state.ready).toBe(true);
  });

  it('error', async () => {
    const sub = new Subject<string>();
    const state = State.fromObservable(sub);
    sub.error(new Error('foo'));
    expect(state.data).toBe(null);
    expect(state.error.message).toBe('foo');
    expect(state.ready).toBe(true);
  });

});
