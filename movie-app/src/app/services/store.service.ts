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
    this.startLogging('PATCH', event, newValue);

    this.previous = this.state;
    const newState = { ...this.state, ...newValue };
    this.behaviorSubject.next(newState);

    this.finishLogging('PATCH', event, newState);
  }

  set(newValue: Partial<T>, event: string = 'Non-specified event') {
    this.startLogging('SET', event, newValue);

    this.previous = this.state;
    const newState = { ...newValue } as T;
    this.behaviorSubject.next(newState);

    this.finishLogging('SET', event, newState);
  }

  private startLogging(section: string, event: string, newValue: Partial<T>) {
    if (environment.production) {
      return;
    }

    console.groupCollapsed(`[${this.store}] [${section}] STARTED`);
    console.log(`Triggered by: ${event}`);
    console.log('Change: ', newValue);
    console.groupEnd();
  }

  private finishLogging(section: string, event: string, newState: T) {
    if (environment.production) {
      return;
    }

    console.groupCollapsed(`[${this.store}] [${section}] FINISHED`);
    console.log(`Triggered by: ${event}`);
    console.log('Previous state: ', this.previous);
    console.log('New state: ', newState);
    console.groupEnd();
  }
}
