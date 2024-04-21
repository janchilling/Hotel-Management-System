import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractDetailsComponent } from './view-contract-details.component';

describe('ViewContractDetailsComponent', () => {
  let component: ViewContractDetailsComponent;
  let fixture: ComponentFixture<ViewContractDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewContractDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
