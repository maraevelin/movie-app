import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AuthStore from '../../../store/';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | undefined>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select(AuthStore.selectIsLoading);
    this.errorMessage$ = this.store.select(AuthStore.selectErrorMessage);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const email = this.form.value.email;
    this.store.dispatch(AuthStore.forgotPassword({ email }));
  }
}
