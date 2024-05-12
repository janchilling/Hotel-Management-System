import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-pop-up-more-info',
  templateUrl: './pop-up-more-info.component.html',
  styleUrls: ['./pop-up-more-info.component.scss']
})
export class PopUpMoreInfoComponent implements OnInit{

  roomType: any;
  roomTypePrice : any;
  slides: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.roomType = this.data.roomType;
    this.roomTypePrice = this.data.roomTypePrice;
  }

}
