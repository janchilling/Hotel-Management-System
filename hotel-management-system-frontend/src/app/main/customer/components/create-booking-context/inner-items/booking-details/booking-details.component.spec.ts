import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingDetailsComponent } from './booking-details.component';
import { LoadingSpinnerComponent } from '../../../../../../shared/components/loading-spinner/loading-spinner.component';
import { InternalServerErrorComponent } from '../../../../../../shared/components/internal-server-error/internal-server-error.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { SelectDetailsComponent } from './items/select-details/select-details.component';
import { ContactDetailsComponent } from './items/contact-details/contact-details.component';
import { of } from 'rxjs';
import {MainButtonComponent} from "../../../../../../shared/components/main-button/main-button.component";

describe('BookingDetailsComponent', () => {
  let component: BookingDetailsComponent;
  let fixture: ComponentFixture<BookingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingDetailsComponent, LoadingSpinnerComponent, InternalServerErrorComponent, SelectDetailsComponent, MainButtonComponent, ContactDetailsComponent],
      imports: [MatSnackBarModule, HttpClientTestingModule, MatDialogModule, ReactiveFormsModule], // Add ReactiveFormsModule to imports
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ hotelId: '123', checkIn: '2024-05-12', checkOut: '2024-05-15' })
            },
            queryParams: of({ hotelId: '123', checkIn: '2024-05-12', checkOut: '2024-05-15' })
          }
        },
        { provide: MatDialog, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(BookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
