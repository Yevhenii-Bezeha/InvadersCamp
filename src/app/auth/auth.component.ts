import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { url } from '../core/models/url';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public currentHref: string = '';
  public url = { ...url, login: `/${url.signin}`, signup: `/${url.signup}` };

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.currentHref = this.route.url;
  }
}
