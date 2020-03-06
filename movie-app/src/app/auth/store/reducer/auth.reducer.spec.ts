import { createAction } from '@ngrx/store';
import { reducer, initialState, AuthState } from './auth.reducer';
import {
  AuthActionTypes,
  reset,
  signUp,
  signUpSuccess,
  signUpFail,
  signIn,
  signInSuccess,
  signInFail,
  signOut,
  signOutSuccess,
  signOutFail
} from '../actions/auth.actions';
import { Credentials } from '../../models/credentials.model';
import { User } from '../../models/user.model';

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
      const result = reducer(undefined, action);
      expect(result).toBe(initialState);
    });
  });

  describe(`${AuthActionTypes.AUTH_RESET}, ${AuthActionTypes.AUTH_SIGN_OUT_SUCCESS}`, () => {
    it('should return the default state', () => {
      const state: AuthState = {
        isLoading: true,
        errorMessage: error.message,
        user
      };

      const actionReset = reset();
      const resultReset = reducer(state, actionReset);

      const actionSignOutSuccess = signOutSuccess();
      const resultSignOutSuccess = reducer(state, actionSignOutSuccess);

      [resultReset, resultSignOutSuccess].forEach(result =>
        expect(result).toEqual({
          isLoading: false,
          errorMessage: undefined,
          user: undefined
        })
      );
    });
  });

  describe(`${AuthActionTypes.AUTH_SIGN_UP}, ${AuthActionTypes.AUTH_SIGN_IN}`, () => {
    it('should toggle isLoading in state', () => {
      const state: AuthState = {
        isLoading: true,
        errorMessage: undefined,
        user: undefined
      };

      const actionSignUp = signUp({ credentials });
      const resultSignUp = reducer(state, actionSignUp);

      const actionSignIn = signIn({ credentials });
      const resultSignIn = reducer(state, actionSignIn);

      [resultSignUp, resultSignIn].forEach(result =>
        expect(result).toEqual({
          ...state,
          isLoading: true
        })
      );
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_UP_SUCCES, () => {
    it('it should toggle off isLoading', () => {
      const state: AuthState = {
        isLoading: true,
        errorMessage: undefined,
        user: undefined
      };
      const action = signUpSuccess({ credentials });
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: false
      });
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_IN_SUCCES, () => {
    it('it should toggle off isLoading and update user in state', () => {
      const state: AuthState = {
        isLoading: true,
        errorMessage: undefined,
        user
      };
      const action = signInSuccess({ user });
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: false,
        user
      });
    });
  });

  describe(`${AuthActionTypes.AUTH_SIGN_UP_FAIL}, ${AuthActionTypes.AUTH_SIGN_IN_FAIL}, ${AuthActionTypes.AUTH_SIGN_OUT_FAIL}`, () => {
    it('it should toggle off isLoading and remove error message from state', () => {
      const state: AuthState = {
        isLoading: true,
        errorMessage: undefined,
        user: undefined
      };

      const actionSignUpFail = signUpFail({ error });
      const resultSignUpFail = reducer(state, actionSignUpFail);

      const actionSignInFail = signInFail({ error });
      const resultSignInFail = reducer(state, actionSignInFail);

      const actionSignOutFail = signOutFail({ error });
      const resultSignOutFail = reducer(state, actionSignOutFail);

      [resultSignUpFail, resultSignInFail, resultSignOutFail].forEach(result =>
        expect(result).toEqual({
          ...state,
          isLoading: false,
          errorMessage: error.message
        })
      );
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_OUT, () => {
    it('it should toggle on isLoading and remove error message from state', () => {
      const state: AuthState = {
        isLoading: false,
        errorMessage: error.message,
        user: undefined
      };
      const action = signOut();
      const result = reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: true,
        errorMessage: undefined
      });
    });
  });
});
