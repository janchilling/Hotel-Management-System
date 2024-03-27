import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsDetailsComponent } from './discounts-details.component';

describe('DiscountsDetailsComponent', () => {
  let component: DiscountsDetailsComponent;
  let fixture: ComponentFixture<DiscountsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountsDetailsComponent]
    });
    fixture = TestBed.createComponent(DiscountsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
