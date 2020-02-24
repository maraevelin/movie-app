import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import * as AuthSelectors from '../../store/auth/selectors/auth.selectors';
import { reset, signIn, signUp } from '../../store/auth/actions/auth.actions';
import { Credentials } from '../../models/credentials.model';

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
