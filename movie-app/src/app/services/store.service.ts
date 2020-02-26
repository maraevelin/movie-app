import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class StoreService<T> {
  protected behaviorSubject: BehaviorSubject<T>;
  public abstract readonly store: string;
  state$: Observable<T>;
  state: T;
  previous: T | undefined;

  constructor(initialValue: Partial<T>) {
    this.behaviorSubject = new BehaviorSubject<T>(initialValue as T);
    this.state$ = this.behaviorSubject.asObservable();
    this.state = initialValue as T;
    this.state$.subscribe(state => (this.state = state));
  }

  patch(newValue: Partial<T>, event: string = 'Non-specified event') {
    this.previous = this.state;
    const newState = { ...this.state, ...newValue };
    this.behaviorSubject.next(newState);

    if (!environment.production) {
      console.groupCollapsed(`[${this.store} STORE] [PATCH] [EVENT: ${event}]`);
      console.log('Previous: ', this.previous);
      console.log('Change: ', newValue);
      console.log('New state: ', newState);
      console.groupEnd();
    }
  }

  set(newValue: Partial<T>, event: string = 'Non-specified event') {
    this.previous = this.state;
    const newState = { ...newValue } as T;
    this.behaviorSubject.next(newState);

    if (!environment.production) {
      console.groupCollapsed(`[${this.store} STORE] [SET] [EVENT: ${event}]`);
      console.log('Previous: ', this.previous);
      console.log('Change: ', newValue);
      console.log('New state: ', newState);
      console.groupEnd();
    }
  }
}
