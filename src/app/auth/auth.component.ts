import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public href: string = '';

  constructor(private route: Router) {}

  ngOnInit() {
    this.href = this.route.url;
    console.log(this.route.url);
  }
}
