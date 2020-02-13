import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isSignIn = false;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder, private service: AuthService) {}

  ngOnInit() {}

  onSwitch() {
    this.isSignIn = !this.isSignIn;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.isSignIn) {
      this.service.signin(this.form.value).subscribe(
        response => {
          console.log(response);
          this.form.reset();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.service.signup(this.form.value).subscribe(
        response => {
          console.log(response);
          this.form.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
