import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { environment } from 'src/environments/environment';
import { WatchListResponse } from './models/watch-list-response.model';

@Injectable({ providedIn: 'root' })
export class WatchListFirestore extends FirestoreService<WatchListResponse> {
  mainCollection = environment.firebaseDb.mainCollection;
  subCollection = environment.firebaseDb.subCollection;
  logId = 'WATCH LIST';
}
