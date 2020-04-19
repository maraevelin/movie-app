import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import * as ResetPasswordStore from '../../../store/reset-password';
import { AppState } from 'src/app/core/store';
import { ConfirmResetPasswordModel } from 'src/app/auth/services/models/confirm-reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  form = this.formBuilder.group(
    {
      password: [
        '',
        { updateOn: 'blur' },
        [Validators.required, Validators.minLength(6)],
      ],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    { validators: this.passwordsMatch }
  );

  oobCode: string | undefined;
  hidePassword = true;
  hidePasswordConfirmation = true;

  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | undefined>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(ResetPasswordStore.selectIsLoading);
    this.errorMessage$ = this.store.select(
      ResetPasswordStore.selectErrorMessage
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.activatedRoute.queryParams.pipe(first()).subscribe((params) => {
      const password = this.form.value.password as string;
      const oobCode = params.oobCode;

      const confirm: ConfirmResetPasswordModel = {
        oobCode,
        password,
      };

      this.store.dispatch(ResetPasswordStore.verify({ confirm }));
    });
  }

  passwordsMatch(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    if (!password || (password.value as string).length < 6) {
      return null;
    }

    const passwordConfirmation = control.get('passwordConfirmation');
    if (
      !passwordConfirmation ||
      (passwordConfirmation.value as string).length < 6
    ) {
      return null;
    }

    return password.value === passwordConfirmation.value
      ? null
      : { mismatched: true };
  }
}
