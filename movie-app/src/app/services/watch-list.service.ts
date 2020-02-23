import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { environment } from 'src/environments/environment';
import { WatchList } from './models/watch-list.model';

@Injectable({ providedIn: 'root' })
export class WatchListService extends FirestoreService<WatchList> {
  mainCollection = environment.firebaseDb.mainCollection;
  subCollection = environment.firebaseDb.subCollection;
  logId = 'WATCH LIST';
}
