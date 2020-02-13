import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin = false;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    const routeConfig = this.route.snapshot.routeConfig;
    this.isLogin = (routeConfig && routeConfig.path === 'login') || false;
  }

  ngOnInit() {}

  onSubmit() {
    this.form.reset();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
