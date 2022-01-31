import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginFormComponent } from './login-form.component';
import { HttpAuthService } from '@services/http-auth.service';
import { LocalStorageService } from '@services/localStorage.service';
import { AuthService } from '@services/auth.service';

describe('LoginComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  const httpAuthServiceSpy = jasmine.createSpyObj('HttpAuthService', ['login']);
  const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
    'setToken',
    'setUser',
  ]);
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['addAuth']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: HttpAuthService, useValue: httpAuthServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.loginForm.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;

    const emailInput = compiled.querySelector('input[formcontrolname="email"]');
    const passwordEmail = compiled.querySelector(
      'input[formcontrolname="password"]'
    );
    const inputElements = compiled.querySelectorAll('input');

    expect(emailInput).toBeTruthy();
    expect(passwordEmail).toBeTruthy();
    expect(inputElements.length).toEqual(2);
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors: any = {};
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();

    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors: any = {};
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('11');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('should be valid if fields are filled', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('123456789');
    expect(component.loginForm.valid).toBeTruthy();
  });
});
