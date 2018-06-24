import { Observable } from 'rxjs';

/**
 * State is class to simplify UI loading/error/data for unary calls
 * When underlying observable is complete or error has occured,
 * the state will reflect that changes
 */
export class State<T> {
  ready = false;
  error: Error = null;
  data: T = null;

  /**
   * Subscribe to Observable and return state
   * that will react to Observable changes
   */
  static fromObservable<T>(ob: Observable<T>) {
    const state = new State<T>();
    ob.subscribe(
      data => state.data = data,
      e => [state.error, state.ready] = [e, true],
      () => state.ready = true,
    );
    return state;
  }

}
