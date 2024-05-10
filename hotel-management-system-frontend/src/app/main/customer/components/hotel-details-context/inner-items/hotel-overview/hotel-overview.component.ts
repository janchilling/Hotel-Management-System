import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hotel-overview',
  templateUrl: './hotel-overview.component.html',
  styleUrls: ['./hotel-overview.component.scss']
})
export class HotelOverviewComponent{

  @Input() hotelDetails: any;

  // Variables to track the visibility of accordion items
  isCollapseOneVisible: boolean = true;
  isCollapseTwoVisible: boolean = false;
  isCollapseThreeVisible: boolean = false;
  isCollapseFourVisible: boolean = false;
  rotationAngle: number = 0;
  rotationAngles: number[] = [0, 0, 0, 0];

  toggleCollapse(collapseNumber: number) {
    switch (collapseNumber) {
      case 1:
        this.isCollapseOneVisible = !this.isCollapseOneVisible;
        break;
      case 2:
        this.isCollapseTwoVisible = !this.isCollapseTwoVisible;
        break;
      case 3:
        this.isCollapseThreeVisible = !this.isCollapseThreeVisible;
        break;
      case 4:
        this.isCollapseFourVisible = !this.isCollapseFourVisible;
        break;
      default:
        break;
    }
  }

  toggleRotation(index: number) {
    this.rotationAngles[index] = this.rotationAngles[index] === 0 ? -180 : 0;
  }

}
