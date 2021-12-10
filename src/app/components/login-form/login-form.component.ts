import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm = this._fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {}
}
