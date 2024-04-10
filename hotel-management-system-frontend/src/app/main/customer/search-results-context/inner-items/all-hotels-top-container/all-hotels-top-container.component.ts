import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-all-hotels-top-container',
  templateUrl: './all-hotels-top-container.component.html',
  styleUrls: ['./all-hotels-top-container.component.scss']
})
export class AllHotelsTopContainerComponent {

  @Input() noOfHotels: number = 0;
  @Input() searchParams: any;

}
