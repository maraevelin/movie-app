import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Credentials } from 'src/app/models/credentials.model';
import { Observable } from 'rxjs';
import * as AuthSelectors from 'src/app/store/auth/selectors/auth.selectors';
import { reset, signIn, signUp } from 'src/app/store/auth/actions/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | undefined>;
  isSignIn = true;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
    this.errorMessage$ = this.store.select(AuthSelectors.selectErrorMessage);
  }

  ngOnInit() {}

  onSwitch() {
    this.isSignIn = !this.isSignIn;
    this.store.dispatch(reset());
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const credentials: Credentials = this.form.value;
    this.store.dispatch(
      this.isSignIn ? signIn({ credentials }) : signUp({ credentials })
    );
  }
}
