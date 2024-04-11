import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHotelContextComponent } from './update-hotel-context.component';

describe('UpdateHotelContextComponent', () => {
  let component: UpdateHotelContextComponent;
  let fixture: ComponentFixture<UpdateHotelContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHotelContextComponent]
    });
    fixture = TestBed.createComponent(UpdateHotelContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
