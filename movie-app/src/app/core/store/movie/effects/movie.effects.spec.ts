import { Observable } from 'rxjs';
import { OmdbApiService } from 'src/app/core/services/omdb-api.service';
import * as MovieStore from '../';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jest-marbles';
import { Action } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movie.model';
import { Actions } from '@ngrx/effects';

describe('MovieEffects', () => {
  let actions$: Observable<Action>;
  let effects: MovieStore.MovieEffects;
  let omdbApiService: OmdbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieStore.MovieEffects,
        provideMockActions(() => actions$),
        {
          provide: OmdbApiService,
          useValue: {
            searchMoviesByTitle: jest.fn(),
            getMovieByImdbId: jest.fn()
          }
        }
      ]
    });

    actions$ = TestBed.get(Actions);
    effects = TestBed.get<MovieStore.MovieEffects>(MovieStore.MovieEffects);
    omdbApiService = TestBed.get<OmdbApiService>(OmdbApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('searchMoviesByTitle service call on success', () => {
    it(`should return an action of type ${MovieStore.searchSuccess.type} with movies`, () => {
      const title = 'Futurama';
      const movies: Movie[] = [];

      const action = MovieStore.search({ title });
      const outcome = MovieStore.searchSuccess({ movies });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-a|', { a: movies });
      const expected$ = cold('--b', { b: outcome });

      omdbApiService.searchMoviesByTitle = jest.fn(() => response$);

      expect(effects.searchMovies$).toBeObservable(expected$);
    });
  });

  describe('searchMoviesByTitle service call on fail', () => {
    it(`should return an action of type ${MovieStore.searchFail.type}`, () => {
      const title = 'Futurama';
      const error = new Error('an error occured');

      const action = MovieStore.search({ title });
      const outcome = MovieStore.searchFail({ error });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-#|', {}, error);
      const expected$ = cold('--b', { b: outcome });

      omdbApiService.searchMoviesByTitle = jest.fn(() => response$);

      expect(effects.searchMovies$).toBeObservable(expected$);
    });
  });
});
