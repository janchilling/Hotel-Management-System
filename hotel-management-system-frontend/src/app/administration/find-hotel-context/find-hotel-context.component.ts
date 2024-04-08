import { Component } from '@angular/core';

@Component({
  selector: 'app-find-hotel-context',
  templateUrl: './find-hotel-context.component.html',
  styleUrls: ['./find-hotel-context.component.scss']
})
export class FindHotelContextComponent {

  resultData: any[] = [];

  handleSubmitClicked(event: any) {
    this.resultData = event.data;
    console.log(this.resultData)
  }

}
