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
  signInFail
} from '../actions/auth.actions';
import { Credentials } from '../../models/credentials.model';
import { User } from '../../models/user.model';

describe('Auth Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = createAction('NOOP');
      const result = reducer(undefined, action);
      expect(result).toBe(initialState);
    });
  });

  describe(AuthActionTypes.AUTH_RESET, () => {
    it('should return the default state', () => {
      const action = reset;
      const result = reducer(undefined, action);
      expect(result).toEqual({
        isLoading: false,
        errorMessage: undefined,
        user: undefined
      });
    });
  });

  const credentials: Credentials = {
    email: 'user@domain.com',
    password: 'pwd'
  };

  describe(AuthActionTypes.AUTH_SIGN_UP, () => {
    it('should toggle isLoading in state', () => {
      const action = signUp({ credentials });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  const signUpState: AuthState = {
    isLoading: true,
    errorMessage: undefined,
    user: undefined
  };

  describe(AuthActionTypes.AUTH_SIGN_UP_SUCCES, () => {
    it('it should toggle off isLoading', () => {
      const action = signUpSuccess({ credentials });
      const result = reducer(signUpState, action);
      expect(result).toEqual({
        ...signUpState,
        isLoading: false
      });
    });
  });

  describe(AuthActionTypes.AUTH_SIGN_UP_FAIL, () => {
    it('it should toggle off isLoading and update error message and user in state', () => {
      const error = new Error('an error occured');
      const action = signUpFail({ error });
      const result = reducer(signUpState, action);
      expect(result).toEqual({
        ...signUpState,
        isLoading: false,
        errorMessage: error.message,
        credentials: { email: '', password: '' }
      });
    });
  });

  /*
  AUTH_SIGN_OUT = '[AUTH] Sign out',
  AUTH_SIGN_OUT_SUCCESS = '[AUTH] Sign out Success',
  AUTH_SIGN_OUT_FAIL = '[AUTH] Sign out Fail'
*/
});
