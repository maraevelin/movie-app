import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { User } from 'src/app/auth/models/user.model';
import * as AuthStore from '../../../auth/store';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(AuthStore.selectUser);
  }

  ngOnInit(): void {}

  onSignOut(): void {
    this.store.dispatch(AuthStore.signOut());
  }
}
