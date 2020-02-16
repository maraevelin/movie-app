import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/root-reducer';
import {
  SignInAction,
  SignUpAction,
  ResetAction
} from 'src/app/store/movie/actions/auth.actions';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import {
  selectIsLoading,
  selectErrorMessage
} from 'src/app/store/movie/selectors/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  isSignIn = false;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  ngOnInit() {}

  onSwitch() {
    this.isSignIn = !this.isSignIn;
    this.store.dispatch(new ResetAction());
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const user: User = this.form.value;
    this.store.dispatch(
      this.isSignIn ? new SignInAction(user) : new SignUpAction(user)
    );
  }
}
