import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiscountDetailsComponent } from './view-discount-details.component';

describe('ViewDiscountDetailsComponent', () => {
  let component: ViewDiscountDetailsComponent;
  let fixture: ComponentFixture<ViewDiscountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDiscountDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewDiscountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
