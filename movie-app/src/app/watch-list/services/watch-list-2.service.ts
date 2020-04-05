import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { WatchList2Data } from '../store';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WatchList2Service {
  watchList = {};
  converter = {
    toFirestore: (data: WatchList2Data): WatchList2Data => ({
      id: data.id,
      isFinished: data.isFinished,
    }),
    fromFirestore: (snapshot: any, options: any): WatchList2Data => {
      return snapshot.data(options);
    },
  };

  constructor(private angularFirestore: AngularFirestore) {}

  // getDocument(docId: string): Promise<void> {
  //   return this.angularFirestore.firestore
  //     .collection(environment.firebaseConfig.testCollection)
  //     .doc(environment.firebaseConfig.testDocument)
  //     .withConverter(this.converter)
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         console.log('Document does not exist!');
  //       } else {
  //         const w2d = doc.data();

  //         if (w2d !== undefined) {
  //           const movies$: Observable<DetailedMovie>[] = [];
  //           Object.keys(w2d).forEach((id) => {
  //             if (!id.startsWith('imdbId')) {
  //               movies$.push(this.omdbService.getMovieByImdbId(id, 'short'));
  //             }
  //           });

  //           forkJoin(movies$).subscribe((result) => console.table(result));
  //         }
  //       }
  //     })
  //     .catch((e) => {
  //       console.log('Error getting document: ', e);
  //     });
  // }

  load(): Observable<firebase.firestore.DocumentSnapshot<WatchList2Data>> {
    return from(
      this.angularFirestore.firestore
        .collection(environment.firebaseConfig.testCollection)
        .doc(environment.firebaseConfig.testDocument)
        .withConverter(this.converter)
        .get()
    );
  }

  addMovie(data: WatchList2Data): Observable<void> {
    return from(
      this.angularFirestore
        .collection(environment.firebaseConfig.testCollection)
        .doc(environment.firebaseConfig.testDocument)
        .set({ [data.id]: data }, { merge: true })
    );
  }

  updateMovie(data: WatchList2Data): Observable<void> {
    return from(
      this.angularFirestore.firestore
        .collection(environment.firebaseConfig.testCollection)
        .doc(environment.firebaseConfig.testDocument)
        .update({ [data.id]: data })
    );
  }

  deleteMovie(id: string): Observable<void> {
    const FieldValue = firebase.firestore.FieldValue;
    return from(
      this.angularFirestore.firestore
        .collection(environment.firebaseConfig.testCollection)
        .doc(environment.firebaseConfig.testDocument)
        .update({ [id]: FieldValue.delete() })
    );
  }
}
