import * as AuthSelectors from '../../store/selectors/auth.selectors';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { reset, signIn, signUp } from '../../store/actions/auth.actions';

import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/core/store';
import { Credentials } from '../../models/credentials.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthConstants } from '../../shared/auth.shared';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  redirectUrl: string | undefined;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | undefined>;
  isSignIn = true;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
    this.errorMessage$ = this.store.select(AuthSelectors.selectErrorMessage);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.redirectUrl = params.get(AuthConstants.REDIRECT_URL) || undefined;
    });
  }

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
      this.isSignIn
        ? signIn({ credentials, returnUrl: this.redirectUrl })
        : signUp({ credentials, returnUrl: this.redirectUrl })
    );
  }
}
