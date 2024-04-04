import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss']
})
export class MainButtonComponent {

  @Input() buttonText: string = 'Button Text';

}
