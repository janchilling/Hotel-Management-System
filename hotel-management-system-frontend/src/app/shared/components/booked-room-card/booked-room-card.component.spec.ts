import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedRoomCardComponent } from './booked-room-card.component';

describe('BookedRoomCardComponent', () => {
  let component: BookedRoomCardComponent;
  let fixture: ComponentFixture<BookedRoomCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookedRoomCardComponent]
    });
    fixture = TestBed.createComponent(BookedRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
