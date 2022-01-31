import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupFormComponent } from './signup-form.component';
import { HttpAuthService } from '@services/http-auth.service';
import { LocalStorageService } from '@services/localStorage.service';
import { AuthService } from '@services/auth.service';

describe('Signup-form component', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  const httpAuthServiceSpy = jasmine.createSpyObj('HttpAuthService', [
    'signup',
  ]);
  const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
    'setToken',
    'setUser',
  ]);
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['addAuth']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [SignupFormComponent],
      providers: [
        { provide: HttpAuthService, useValue: httpAuthServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.signupForm).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;

    const nameInput = compiled.querySelector('input[formcontrolname="name"]');
    const emailInput = compiled.querySelector('input[formcontrolname="email"]');
    const passwordEmail = compiled.querySelector(
      'input[formcontrolname="password"]'
    );

    const inputElements = compiled.querySelectorAll('input');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordEmail).toBeTruthy();

    expect(inputElements.length).toEqual(3);
  });

  it('form invalid when empty', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let errors: any = {};
    let name = component.signupForm.controls['name'];
    expect(name.valid).toBeFalsy();

    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();

    name.setValue('Iv');
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    name.setValue('Ivan');
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('email field validity', () => {
    let errors: any = {};
    let email = component.signupForm.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test@test.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors: any = {};
    let password = component.signupForm.controls['password'];
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
    expect(component.signupForm.valid).toBeFalsy();
    component.signupForm.controls['name'].setValue('Ivan');
    component.signupForm.controls['email'].setValue('test@test.com');
    component.signupForm.controls['password'].setValue('123456789');
    expect(component.signupForm.valid).toBeTruthy();
  });
});
