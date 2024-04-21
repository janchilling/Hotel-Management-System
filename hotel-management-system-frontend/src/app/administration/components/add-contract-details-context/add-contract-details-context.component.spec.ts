import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractDetailsContextComponent } from './add-contract-details-context.component';

describe('AddContractDetailsContextComponent', () => {
  let component: AddContractDetailsContextComponent;
  let fixture: ComponentFixture<AddContractDetailsContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContractDetailsContextComponent]
    });
    fixture = TestBed.createComponent(AddContractDetailsContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
