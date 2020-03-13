import { Observable } from 'rxjs';
import { OmdbApiService } from 'src/app/core/services/omdb-api.service';
import * as MovieStore from '../';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jest-marbles';
import { Action } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movie.model';
import { Actions } from '@ngrx/effects';
import { DetailedMovie } from 'src/app/core/models/detailed-movie.model';

describe('MovieEffects', () => {
  let actions$: Observable<Action>;
  let effects: MovieStore.MovieEffects;
  let omdbApiService: OmdbApiService;

  const movies: Movie[] = [
    { imdbId: 'imdbId1', posterUrl: 'posterUrl1' },
    { imdbId: 'imdbId2', posterUrl: 'posterUrl2' }
  ];

  const detailedMovie: DetailedMovie = {
    imdbId: 'id',
    title: 'title',
    year: 'year',
    rating: 'rating',
    runTime: 'runTime',
    posterUrl: 'posterUrl',
    actors: ['actor1', 'actor2'],
    writers: ['writer1', 'writer2'],
    plot: 'plot'
  };

  const error = new Error('an error occured');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OmdbApiService,
          useValue: {
            searchMoviesByTitle: jest.fn(),
            getMovieByImdbId: jest.fn()
          }
        },
        MovieStore.MovieEffects,
        provideMockActions(() => actions$)
      ]
    });

    actions$ = TestBed.get<Actions>(Actions);
    effects = TestBed.get<MovieStore.MovieEffects>(MovieStore.MovieEffects);
    omdbApiService = TestBed.get<OmdbApiService>(OmdbApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('searchMoviesByTitle service call, success', () => {
    it(`should dispatch an action of type ${MovieStore.searchSuccess.type} with movies`, () => {
      const title = 'Futurama';

      const action = MovieStore.search({ title });
      const outcome = MovieStore.searchSuccess({ movies });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-a', { a: movies });
      const expected$ = cold('--b', { b: outcome });

      omdbApiService.searchMoviesByTitle = jest.fn(() => response$);

      expect(effects.searchMovies$).toBeObservable(expected$);
    });
  });

  describe('searchMoviesByTitle service call, fail', () => {
    it(`should dispatch an action of type ${MovieStore.searchFail.type}`, () => {
      const title = 'Futurama';

      const action = MovieStore.search({ title });
      const outcome = MovieStore.searchFail({ error });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-#', {}, error);
      const expected$ = cold('--b', { b: outcome });

      omdbApiService.searchMoviesByTitle = jest.fn(() => response$);

      expect(effects.searchMovies$).toBeObservable(expected$);
    });
  });

  describe('getDetailedMovie service call, success', () => {
    it(`should dispatch an action of type ${MovieStore.getDetailedSuccess.type} with detailed movie`, () => {
      const id = 'id';

      const action = MovieStore.getDetailed({ id });
      const outcome = MovieStore.getDetailedSuccess({ detailedMovie });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-a', { a: detailedMovie });
      const expected$ = cold('--b', { b: outcome });

      omdbApiService.getMovieByImdbId = jest.fn(() => response$);

      expect(effects.getDetailedMovie$).toBeObservable(expected$);
    });
  });

  describe('getDetailedMovie service call, fail', () => {
    it(`should dispatch an action of type ${MovieStore.getDetailedFail.type}`, () => {
      const id = 'id';

      const action = MovieStore.getDetailed({ id });
      const outcome = MovieStore.getDetailedFail({ error });

      actions$ = hot('-a', { a: action });

      const response$ = cold('-#', {}, error);
      const expected$ = cold('--b', { b: outcome });

      omdbApiService.getMovieByImdbId = jest.fn(() => response$);

      expect(effects.getDetailedMovie$).toBeObservable(expected$);
    });
  });
});
