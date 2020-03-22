import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as SnackBarStore from '../';
import { hot } from 'jest-marbles';

describe('SnackBarEffects', () => {
  let actions$: Observable<Action>;
  let effects: SnackBarStore.SnackBarEffects;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: { open: jest.fn() } },
        SnackBarStore.SnackBarEffects,
        provideMockActions(() => actions$)
      ]
    });

    actions$ = TestBed.get<Actions>(Actions);
    effects = TestBed.get<SnackBarStore.SnackBarEffects>(
      SnackBarStore.SnackBarEffects
    );
    snackBar = TestBed.get<MatSnackBar>(MatSnackBar);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle a successful notification', () => {
    const message = 'Successul action';
    const cssClass = 'success';

    const action = SnackBarStore.notify({
      message,
      cssClass
    });

    actions$ = hot('-a', { a: action });

    effects.notifications$.subscribe(() => {
      expect(snackBar.open).toHaveBeenCalledWith(action.message, undefined, {
        panelClass: [cssClass],
        duration: 5000
      });
    });
  });

  it('should handle an error notification', () => {
    const message = 'An error occured';
    const cssClass = 'error';

    const action = SnackBarStore.notify({
      message,
      cssClass
    });

    actions$ = hot('-a', { a: action });

    effects.notifications$.subscribe(() => {
      expect(snackBar.open).toHaveBeenCalledWith(action.message, undefined, {
        panelClass: [cssClass],
        duration: 5000
      });
    });
  });
});
