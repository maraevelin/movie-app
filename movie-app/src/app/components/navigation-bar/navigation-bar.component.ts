import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { User } from 'src/app/auth-module/models/user.model';
import { selectUser } from 'src/app/auth-module/store/auth/selectors/auth.selectors';
import { signOut } from 'src/app/auth-module/store/auth/actions/auth.actions';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {}

  onSignOut() {
    this.store.dispatch(signOut());
  }
}
