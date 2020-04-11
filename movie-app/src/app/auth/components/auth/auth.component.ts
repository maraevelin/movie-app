import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AuthStore from '../../store';
import { AuthConstants } from '../../shared/auth.shared';
import { Credentials } from '../../models/credentials.model';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  redirectUrl: string | undefined;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | undefined>;
  isSignIn = true;
  hidePassword = true;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(AuthStore.selectIsLoading);
    this.errorMessage$ = this.store.select(AuthStore.selectErrorMessage);
  }

  ngOnInit() {
    this.store.dispatch(AuthStore.reset());

    this.route.queryParamMap.subscribe((params) => {
      this.redirectUrl = params.get(AuthConstants.REDIRECT_URL) || undefined;
    });
  }

  onSwitch() {
    this.isSignIn = !this.isSignIn;
    this.store.dispatch(AuthStore.reset());
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const credentials: Credentials = this.form.value;
    this.store.dispatch(
      this.isSignIn
        ? AuthStore.signIn({ credentials, returnUrl: this.redirectUrl })
        : AuthStore.signUp({ credentials, returnUrl: this.redirectUrl })
    );
  }
}
