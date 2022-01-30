import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpAuthService } from '../../../core/services/http-auth.service';
import { BaseComponent } from '../../../shared/classes/BaseComponent';
import { LocalStorageService } from '../../../core/services/localStorage.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public signupForm: FormGroup;
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
    this.signupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
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

  signup(): void {
    super.addObserver(
      this.httpAuthService.signup(this.signupForm.value).subscribe(
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
    this.signup();
    this.signupForm.reset();
  }
}
