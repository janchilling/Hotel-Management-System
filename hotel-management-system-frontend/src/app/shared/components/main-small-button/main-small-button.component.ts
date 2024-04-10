import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-main-small-button',
  templateUrl: './main-small-button.component.html',
  styleUrls: ['./main-small-button.component.scss']
})
export class MainSmallButtonComponent {

  @Input() buttonText: string = 'Button Text';
}
