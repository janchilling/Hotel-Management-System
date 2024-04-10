import { TestBed } from '@angular/core/testing';
import {
  ConfirmationDialogComponentComponent
} from "../../components/confirmation-dialog-component/confirmation-dialog-component.component";


describe('CustomDateAdapterService', () => {
  let service: ConfirmationDialogComponentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationDialogComponentComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
