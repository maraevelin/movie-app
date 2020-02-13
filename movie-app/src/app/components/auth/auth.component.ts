import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = false;

  constructor(private route: ActivatedRoute) {
    const routeConfig = this.route.snapshot.routeConfig;
    this.isLoginMode = (routeConfig && routeConfig.path === 'login') || false;
  }

  ngOnInit() {}
}
