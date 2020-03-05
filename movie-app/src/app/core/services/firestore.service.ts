import { Inject } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectUser } from '../../auth/store/selectors/auth.selectors';

export abstract class FirestoreService<T> {
  protected abstract mainCollection: string;
  protected abstract subCollection: string;
  protected abstract logId: string;

  private userId: string | undefined = undefined;

  constructor(
    @Inject(AngularFirestore) protected firestore: AngularFirestore,
    @Inject(Store) private store: Store<AppState>
  ) {
    this.store.select(selectUser).subscribe(user => {
      this.userId = user ? user.id : undefined;
    });
  }

  private get collection() {
    if (!this.userId) {
      return undefined;
    }

    return this.firestore
      .collection(this.mainCollection)
      .doc(this.userId)
      .collection(this.subCollection);
  }

  collection$(queryFn?: QueryFn): Observable<T[] | undefined> {
    if (!this.userId) {
      return of(undefined);
    }

    return this.firestore
      .collection(this.mainCollection)
      .doc(this.userId)
      .collection<T>(this.subCollection, queryFn)
      .valueChanges()
      .pipe(
        tap(r => {
          if (!environment.production) {
            console.groupCollapsed(
              `[${this.logId}] [${this.mainCollection}] Collection`
            );
            console.table(r);
            console.groupEnd();
          }
        })
      );
  }

  doc$(id: string): Observable<T | undefined> {
    if (!this.collection) {
      return of(undefined);
    }

    return this.collection
      .doc<T>(id)
      .valueChanges()
      .pipe(
        tap(r => {
          if (!environment.production) {
            console.groupCollapsed(
              `[${this.logId}] [${this.mainCollection}] [${id}] Document`
            );
            console.log(r);
            console.groupEnd();
          }
        })
      );
  }

  async createDoc(object: { id: string } & T): Promise<void> {
    if (!this.collection) {
      return;
    }

    return await this.collection
      .doc<T>(object.id)
      .set({ ...object }, { merge: true })
      .then(() => {
        if (!environment.production) {
          console.groupCollapsed(`[${this.logId}] Create document`);
          console.log(`[ID] ${object.id}`);
          console.groupEnd();
        }
      });
  }

  async updateDoc(object: { id: string } & T): Promise<void> {
    if (!this.collection) {
      return;
    }

    return await this.collection
      .doc<T>(object.id)
      .set({ ...object }, { merge: true })
      .then(() => {
        if (!environment.production) {
          console.groupCollapsed(`[${this.logId}] Update document`);
          console.log(`[ID] ${object.id}`);
          console.groupEnd();
        }
      });
  }

  async removeDoc(id: string): Promise<void> {
    if (!this.collection) {
      return;
    }

    return await this.collection
      .doc(id)
      .delete()
      .then(() => {
        if (!environment.production) {
          console.groupCollapsed(`[${this.logId}] Remove document`);
          console.log(`[ID] ${id}`);
          console.groupEnd();
        }
      });
  }
}
