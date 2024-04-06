import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingsContextComponent } from './all-bookings-context.component';

describe('AllBookingsContextComponent', () => {
  let component: AllBookingsContextComponent;
  let fixture: ComponentFixture<AllBookingsContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBookingsContextComponent]
    });
    fixture = TestBed.createComponent(AllBookingsContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
