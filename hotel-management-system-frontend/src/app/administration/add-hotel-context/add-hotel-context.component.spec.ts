import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelContextComponent } from './add-hotel-context.component';

describe('AddHotelContextComponent', () => {
  let component: AddHotelContextComponent;
  let fixture: ComponentFixture<AddHotelContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHotelContextComponent]
    });
    fixture = TestBed.createComponent(AddHotelContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
