import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractContextComponent } from './view-contract-context.component';

describe('ViewContractContextComponent', () => {
  let component: ViewContractContextComponent;
  let fixture: ComponentFixture<ViewContractContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewContractContextComponent]
    });
    fixture = TestBed.createComponent(ViewContractContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
