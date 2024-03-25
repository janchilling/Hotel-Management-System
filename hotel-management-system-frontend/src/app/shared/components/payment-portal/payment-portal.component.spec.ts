import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPortalComponent } from './payment-portal.component';

describe('PaymentPortalComponent', () => {
  let component: PaymentPortalComponent;
  let fixture: ComponentFixture<PaymentPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentPortalComponent]
    });
    fixture = TestBed.createComponent(PaymentPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
