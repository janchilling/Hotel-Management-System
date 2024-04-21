import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractContextComponent } from './add-contract-context.component';

describe('AddContractContextComponent', () => {
  let component: AddContractContextComponent;
  let fixture: ComponentFixture<AddContractContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContractContextComponent]
    });
    fixture = TestBed.createComponent(AddContractContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
