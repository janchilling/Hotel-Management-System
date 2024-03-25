import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedBillCardComponent } from './booked-bill-card.component';

describe('BookedBillCardComponent', () => {
  let component: BookedBillCardComponent;
  let fixture: ComponentFixture<BookedBillCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookedBillCardComponent]
    });
    fixture = TestBed.createComponent(BookedBillCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
