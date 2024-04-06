import {Component, Inject} from '@angular/core';
import {data} from "autoprefixer";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog-component',
  templateUrl: './confirmation-dialog-component.component.html',
  styleUrls: ['./confirmation-dialog-component.component.scss']
})
export class ConfirmationDialogComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

}
