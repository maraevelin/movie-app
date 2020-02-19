import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DetailedMovie } from '../models/detailed-movie.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { selectUser } from '../store/auth/selectors/auth.selectors';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  db = this.firestore.collection(environment.firebaseDb.collection);
  user$: Observable<User | null>;

  constructor(
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.store.select(selectUser);
  }

  addToWatchList(movie: DetailedMovie) {
    this.user$.pipe(take(1)).subscribe(user => {
      if (!user || !user.id) {
        throw Error('Unkown error');
      }

      this.db.doc(user.id).set(
        {
          [movie.imdbId]: { isFinished: false, rating: '', title: movie.title }
        },
        { merge: true }
      );
    });
  }

  removeFromWatchList(movie: DetailedMovie) {
    this.user$.pipe(take(1)).subscribe(user => {
      if (!user || !user.id) {
        throw Error('Unkown error');
      }

      this.db
        .doc(user.id)
        .update({ [movie.imdbId]: firebase.firestore.FieldValue.delete() });
    });
  }
}
