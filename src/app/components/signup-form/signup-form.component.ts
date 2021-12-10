import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  public signupForm = this._fb.group({
    userName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {}
}
