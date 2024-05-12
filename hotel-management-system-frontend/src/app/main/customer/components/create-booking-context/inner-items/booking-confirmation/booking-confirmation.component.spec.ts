import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingConfirmationComponent } from './booking-confirmation.component';
import {LoadingSpinnerComponent} from "../../../../../../shared/components/loading-spinner/loading-spinner.component";
import {
  InternalServerErrorComponent
} from "../../../../../../shared/components/internal-server-error/internal-server-error.component";

describe('BookingConfirmationComponent', () => {
  let component: BookingConfirmationComponent;
  let fixture: ComponentFixture<BookingConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingConfirmationComponent, LoadingSpinnerComponent, InternalServerErrorComponent],
    });
    fixture = TestBed.createComponent(BookingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
