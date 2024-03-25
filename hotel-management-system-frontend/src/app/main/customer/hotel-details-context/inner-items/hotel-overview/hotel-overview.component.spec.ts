import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOverviewComponent } from './hotel-overview.component';

describe('HotelOverviewComponent', () => {
  let component: HotelOverviewComponent;
  let fixture: ComponentFixture<HotelOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelOverviewComponent]
    });
    fixture = TestBed.createComponent(HotelOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
