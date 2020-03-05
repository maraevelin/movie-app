import { createAction } from '@ngrx/store';
import { reducer, initialState } from './auth.reducer';
import { AuthActionTypes, reset } from '../actions/auth.actions';

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

  /*
  AUTH_RESET = '[AUTH] Reset',

  AUTH_SIGN_UP = '[AUTH] Sign up',
  AUTH_SIGN_UP_SUCCES = '[AUTH] Sign up Success',
  AUTH_SIGN_UP_FAIL = '[AUTH] Sign up Fail',

  AUTH_SIGN_IN = '[AUTH] Sign in',
  AUTH_SIGN_IN_SUCCES = '[AUTH] Sign in Success',
  AUTH_SIGN_IN_FAIL = '[AUTH] Sign in Fail',

  AUTH_SIGN_OUT = '[AUTH] Sign out',
  AUTH_SIGN_OUT_SUCCESS = '[AUTH] Sign out Success',
  AUTH_SIGN_OUT_FAIL = '[AUTH] Sign out Fail'
*/
});
