import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomtypeDetailsComponent } from './roomtype-details.component';

describe('RoomtypeDetailsComponent', () => {
  let component: RoomtypeDetailsComponent;
  let fixture: ComponentFixture<RoomtypeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomtypeDetailsComponent]
    });
    fixture = TestBed.createComponent(RoomtypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
