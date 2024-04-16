import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BookingDataServiceService
} from "../../../../../../../shared/services/bookingDataService/booking-data-service.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contactForm: FormGroup;
  @Output() contactDetailsChanged = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private bookingDataService: BookingDataServiceService) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
    this.contactForm.valueChanges.subscribe(() => {
      this.emitContactDetails();
    });
  }

  ngOnInit(): void {
    // Initialize the form with default values and validation rules

  }

  // Convenience getters for easy access to form controls
  get form() { return this.contactForm.controls; }

  emitContactDetails() {
    if (this.contactForm.valid) {
      this.contactDetailsChanged.emit(this.contactForm.value);
    } else {
      // Handle invalid form
    }
  }

}
