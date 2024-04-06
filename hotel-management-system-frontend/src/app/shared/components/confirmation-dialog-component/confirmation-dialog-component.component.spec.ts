import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponentComponent } from './confirmation-dialog-component.component';

describe('ConfirmationDialogComponentComponent', () => {
  let component: ConfirmationDialogComponentComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
