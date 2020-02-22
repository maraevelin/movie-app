import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetailedMovie } from '../models/detailed-movie.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { selectUser } from '../store/auth/selectors/auth.selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userId = environment.firebaseDb.userId;
  subCollection = environment.firebaseDb.subCollection;

  db = this.firestore.collection(environment.firebaseDb.collection);
  imdbIds$: Observable<string[]>;
  imdbIds2$: Observable<any[]>;

  user$: Observable<User | null>;

  constructor(
    private store: Store<AppState>,
    private readonly firestore: AngularFirestore
  ) {
    this.user$ = this.store.select(selectUser);

    this.imdbIds2$ = this.db
      .doc(this.userId)
      .collection(this.subCollection)
      .valueChanges();

    this.imdbIds2$.subscribe(s => {
      console.log('value changes');
      console.log(s);
    });

    this.imdbIds$ = this.db
      .doc(this.userId)
      .collection(this.subCollection)
      .stateChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            console.log('state changes');
            console.log(action);
            return action.payload.doc.id;
          });
        })
      );

    this.imdbIds$.subscribe();
  }

  addToWatchList(movie: DetailedMovie) {
    this.db
      .doc(this.userId)
      .collection(this.subCollection)
      .doc(movie.imdbId)
      .set({ title: movie.title, imdbId: movie.imdbId }, { merge: true })
      .catch(error => {
        console.log(`error occured: ${error}`);
      })
      .then(() => {
        console.log('addition finished');
      });
  }

  removeFromWatchList(movie: DetailedMovie) {
    this.db
      .doc(this.userId)
      .collection(this.subCollection)
      .doc(movie.imdbId)
      .delete()
      .catch(error => {
        console.warn('here after error ,' + error);
      })
      .then(() => {
        console.log('here after delete');
      });
  }
}
