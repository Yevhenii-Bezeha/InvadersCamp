import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture!: ComponentFixture<AppComponent>;
  let component!: AppComponent;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should close the error', fakeAsync(() => {
    component.error = 'error';

    fixture.detectChanges();

    const button = el.nativeElement.querySelector(
      'button[data-id-test="unit"]'
    );

    button.click();

    fixture.detectChanges();

    flush();

    const error = el.queryAll(By.css('.error'));

    expect(error.length).toBe(0);
  }));
});
