import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarCardsComponent } from './sidebar-cards.component';

describe('SidebarCardsComponent', () => {
  let component: SidebarCardsComponent;
  let fixture: ComponentFixture<SidebarCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarCardsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCardsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
