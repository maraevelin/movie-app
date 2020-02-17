import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectIsSignedIn } from 'src/app/store/auth/selectors/auth.selectors';
import { reset } from 'src/app/store/auth/actions/auth.actions';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  isSignedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isSignedIn$ = this.store.select(selectIsSignedIn);
  }

  ngOnInit() {}

  onSignOut() {
    this.store.dispatch(reset());
  }
}
