import { createAction } from '@ngrx/store';
import { Credentials } from '../../models/credentials.model';
import { User } from '../../models/user.model';
import * as AuthStore from '../';

describe('Auth Reducer', () => {
  const credentials: Credentials = {
    email: 'user@domain.com',
    password: 'pwd'
  };
  const user: User = { id: 'id', email: credentials.email };
  const error = new Error('an error occured');

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = createAction('NOOP');
      const result = AuthStore.reducer(undefined, action);
      expect(result).toBe(AuthStore.initialState);
    });
  });

  describe(`${AuthStore.reset.type}, ${AuthStore.signOutSuccess.type}`, () => {
    it('should return the default state', () => {
      const state: AuthStore.AuthState = {
        isLoading: true,
        errorMessage: error.message,
        user
      };

      const actionReset = AuthStore.reset();
      const resultReset = AuthStore.reducer(state, actionReset);

      const actionSignOutSuccess = AuthStore.signOutSuccess();
      const resultSignOutSuccess = AuthStore.reducer(
        state,
        actionSignOutSuccess
      );

      [resultReset, resultSignOutSuccess].forEach(result =>
        expect(result).toEqual({
          isLoading: false,
          errorMessage: undefined,
          user: undefined
        })
      );
    });
  });

  describe(`${AuthStore.signUp.type}, ${AuthStore.signIn.type}`, () => {
    it('should toggle isLoading in state', () => {
      const state: AuthStore.AuthState = {
        isLoading: true,
        errorMessage: undefined,
        user: undefined
      };

      const actionSignUp = AuthStore.signUp({ credentials });
      const resultSignUp = AuthStore.reducer(state, actionSignUp);

      const actionSignIn = AuthStore.signIn({ credentials });
      const resultSignIn = AuthStore.reducer(state, actionSignIn);

      [resultSignUp, resultSignIn].forEach(result =>
        expect(result).toEqual({
          ...state,
          isLoading: true
        })
      );
    });
  });

  describe(AuthStore.signUpSuccess.type, () => {
    it('it should toggle off isLoading', () => {
      const state: AuthStore.AuthState = {
        isLoading: true,
        errorMessage: undefined,
        user: undefined
      };
      const action = AuthStore.signUpSuccess({ credentials });
      const result = AuthStore.reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: false
      });
    });
  });

  describe(AuthStore.signInSuccess.type, () => {
    it('it should toggle off isLoading and update user in state', () => {
      const state: AuthStore.AuthState = {
        isLoading: true,
        errorMessage: undefined,
        user
      };
      const action = AuthStore.signInSuccess({ user });
      const result = AuthStore.reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: false,
        user
      });
    });
  });

  describe(`${AuthStore.signUpFail.type}, ${AuthStore.signInFail.type}, ${AuthStore.signOutFail.type}`, () => {
    it('it should toggle off isLoading and remove error message from state', () => {
      const state: AuthStore.AuthState = {
        isLoading: true,
        errorMessage: undefined,
        user: undefined
      };

      const actionSignUpFail = AuthStore.signUpFail({ error });
      const resultSignUpFail = AuthStore.reducer(state, actionSignUpFail);

      const actionSignInFail = AuthStore.signInFail({ error });
      const resultSignInFail = AuthStore.reducer(state, actionSignInFail);

      const actionSignOutFail = AuthStore.signOutFail({ error });
      const resultSignOutFail = AuthStore.reducer(state, actionSignOutFail);

      [resultSignUpFail, resultSignInFail, resultSignOutFail].forEach(result =>
        expect(result).toEqual({
          ...state,
          isLoading: false,
          errorMessage: error.message
        })
      );
    });
  });

  describe(AuthStore.signOut.type, () => {
    it('it should toggle on isLoading and remove error message from state', () => {
      const state: AuthStore.AuthState = {
        isLoading: false,
        errorMessage: error.message,
        user: undefined
      };
      const action = AuthStore.signOut();
      const result = AuthStore.reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: true,
        errorMessage: undefined
      });
    });
  });
});
