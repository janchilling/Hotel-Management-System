import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOffersComponent } from './hotel-offers.component';

describe('HotelOffersComponent', () => {
  let component: HotelOffersComponent;
  let fixture: ComponentFixture<HotelOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelOffersComponent]
    });
    fixture = TestBed.createComponent(HotelOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
