import { createAction } from '@ngrx/store';
import { reducer, initialState } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = createAction('NOOP');
      const result = reducer(undefined, action);
      expect(result).toBe(initialState);
    });
  });
});
