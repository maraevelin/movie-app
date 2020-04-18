import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const email = this.form.value.email;
    if (!email) {
      return;
    }
  }
}
