import { Component } from '@angular/core';

@Component({
  selector: 'app-add-hotel-context',
  templateUrl: './add-hotel-context.component.html',
  styleUrls: ['./add-hotel-context.component.scss']
})
export class AddHotelContextComponent {
  hotelName: string = '';

  submitForm() {
    // Process form submission
    console.log(this.hotelName)
    console.log('Form submitted successfully');
  }
}
