import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ResetPasswordStore from '../../../store/reset-password';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss'],
})
export class RequestResetPasswordComponent implements OnInit {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.select(ResetPasswordStore.selectIsLoading);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;

    this.store.dispatch(ResetPasswordStore.requestResetLink({ email }));
  }
}
