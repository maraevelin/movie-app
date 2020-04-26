import * as AuthStore from '../';
import * as SnackBarStore from '../../../../core/store/snack-bar';

import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jest-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { Credentials } from '../../../models/credentials.model';
import { User } from '../../../models/user.model';
import { BlankComponent } from 'src/app/tests/blank/blank.component';
import { Location } from '@angular/common';

const credentials: Credentials = {
  email: 'user@domain.com',
  password: 'password',
};

const user: User = { id: 'id', email: 'user@domain.com' };

const error = new Error('an error occured');

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthStore.AuthEffects;
  let authService: AuthService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '**', component: BlankComponent },
        ]),
      ],
      providers: [
        provideMockStore({}),
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            signOut: jest.fn(),
          },
        },
        AuthStore.AuthEffects,
        provideMockActions(() => actions$),
      ],
      declarations: [BlankComponent],
    });

    actions$ = TestBed.get<Actions>(Actions);
    effects = TestBed.get<AuthStore.AuthEffects>(AuthStore.AuthEffects);
    authService = TestBed.get<AuthService>(AuthService);
    location = TestBed.get<Location>(Location);
    TestBed.createComponent(BlankComponent);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('signUp service call, success', () => {
    it(`should dispatch an action of type ${AuthStore.signUpSuccess.type} with credentials`, () => {
      const action = AuthStore.signUp({ credentials });
      actions$ = hot('-a', { a: action });

      const notification = SnackBarStore.success({
        message: 'Your account has been created',
      });
      const outcome = AuthStore.signUpSuccess({ credentials });

      const response$ = cold('-a', { a: credentials });
      authService.signUp = jest.fn(() => response$);

      const expected$ = cold('--(nb)', { n: notification, b: outcome });
      expect(effects.signUp$).toBeObservable(expected$);
    });
  });

  describe('signUp service call, fail', () => {
    it(`should dispatch an action of type ${AuthStore.signUpFail.type} with error`, () => {
      const action = AuthStore.signUp({ credentials });
      actions$ = hot('-a', { a: action });

      const outcome = AuthStore.signUpFail({ error });
      const notification = SnackBarStore.error({message: 'an error occured'});

      const response$ = cold('-#', {}, error);
      authService.signUp = jest.fn(() => response$);

      const expected$ = cold('--(bn)', { b: outcome, n: notification });
      expect(effects.signUp$).toBeObservable(expected$);
    });
  });

  describe('signIn service call, ', () => {
    it(`should dispatch an action of type ${AuthStore.signInSuccess} with user`, () => {
      const action = AuthStore.signIn({ credentials });
      const outcome = AuthStore.signInSuccess({ user });

      actions$ = hot('-a', { a: action });

      const metadata = {
        user: { uid: user.id, email: user.email },
        returnUrl: undefined,
      };
      const response$ = cold('-a', {
        a: { user: metadata.user, returnUrl: metadata.returnUrl },
      });
      authService.signIn = jest.fn(() => response$);

      const expected$ = cold('--b', { b: outcome });
      expect(effects.signIn$).toBeObservable(expected$);
    });
  });

  describe('signIn service call, fail', () => {
    it(`should dispatch an action of type ${AuthStore.signInFail.type} with error`, () => {
      const action = AuthStore.signIn({ credentials });
      actions$ = hot('-a', { a: action });

      const outcome = AuthStore.signInFail({ error });
      const notification = SnackBarStore.error({message: 'an error occured'});

      const response$ = cold('-#', {}, error);
      authService.signIn = jest.fn(() => response$);

      const expected$ = cold('--(bn)', { b: outcome, n: notification });
      expect(effects.signIn$).toBeObservable(expected$);
    });
  });

  describe('signOut service call, success', () => {
    it(`should dispatch an action of type ${AuthStore.signOutSuccess.type}`, () => {
      const action = AuthStore.signOut();
      const outcome = AuthStore.signOutSuccess();

      actions$ = hot('-a', { a: action });

      const response$ = cold('-b', { b: outcome });
      authService.signOut = jest.fn(() => response$);

      const expected$ = cold('--b', { b: outcome });
      expect(effects.signOut$).toBeObservable(expected$);
    });
  });

  describe('signOut service call, fail', () => {
    it(`should dispatch an action of type ${AuthStore.signOutFail.type} with error`, () => {
      const action = AuthStore.signOut();
      const outcome = AuthStore.signOutFail({ error });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-#', {}, error);
      authService.signOut = jest.fn(() => response$);

      const expected$ = cold('--b', { b: outcome });
      expect(effects.signOut$).toBeObservable(expected$);
    });
  });

  describe('signUp success dispatched', () => {
    it(`should dispatch an action of type ${AuthStore.signIn.type}`, () => {
      const action = AuthStore.signUpSuccess({ credentials });
      const outcome = AuthStore.signIn({ credentials, returnUrl: undefined });

      actions$ = hot('-a', { a: action });
      const expected$ = cold('-b', { b: outcome });

      expect(effects.automaticSignIn$).toBeObservable(expected$);
    });
  });

  describe('sigIn success without returnUrl dispatched', () => {
    it(`should redirect to /watch-list`, () => {
      const action = AuthStore.signInSuccess({ user });

      actions$ = hot('-a', { a: action });

      effects.automaticRedirectOnSignInSuccess$.subscribe(() => {
        expect(location.path()).toBe('/watch-list');
      });
    });
  });

  describe('sigIn success with returnUrl dispatched', () => {
    it(`should redirect to return url`, () => {
      const action = AuthStore.signInSuccess({ user });

      actions$ = hot('-a', { a: action, returnUrl: 'test' });

      effects.automaticRedirectOnSignInSuccess$.subscribe(() => {
        expect(location.path()).toBe('/test');
      });
    });
  });

  describe('sigOut success dispatched', () => {
    it(`should redirect to home`, () => {
      location.replaceState('/test');
      const action = AuthStore.signOutSuccess();

      actions$ = hot('-a', { a: action });

      effects.automaticRedirectOnSignOutSuccess$.subscribe(() => {
        expect(location.path()).toBe('/');
      });
    });
  });
});
