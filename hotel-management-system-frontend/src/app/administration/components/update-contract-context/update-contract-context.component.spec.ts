import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractContextComponent } from './update-contract-context.component';

describe('UpdateContractContextComponent', () => {
  let component: UpdateContractContextComponent;
  let fixture: ComponentFixture<UpdateContractContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateContractContextComponent]
    });
    fixture = TestBed.createComponent(UpdateContractContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
