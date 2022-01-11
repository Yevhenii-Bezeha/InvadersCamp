import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/classes/BaseComponent';
import { HttpAuthService } from '../../../core/services/http-auth.service';
import { LocalStorageService } from '../../../core/services/localStorage.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public loginForm: FormGroup;
  public error: string = '';

  constructor(
    private fb: FormBuilder,
    private httpAuthService: HttpAuthService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private route: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getFormDone();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getFormDone() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signin(): void {
    super.addObserver(
      this.httpAuthService.login(this.loginForm.value).subscribe(
        (data: any) => {
          this.localStorageService.setToken(data.accessToken);
          this.localStorageService.setUser(data);
          this.authService.addAuth();
          this.error = '';
          this.route.navigateByUrl('/').then();
        },
        (error: any) => {
          console.log(error);
          this.error = error.error.message;
        }
      )
    );
  }

  onClose(): void {
    this.error = '';
  }

  onSubmit(): void {
    this.signin();
    this.loginForm.reset();
  }
}
