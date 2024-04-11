import { Component } from '@angular/core';

@Component({
  selector: 'app-add-contract-details-context',
  templateUrl: './add-contract-details-context.component.html',
  styleUrls: ['./add-contract-details-context.component.scss']
})
export class AddContractDetailsContextComponent {

  loading: boolean = false;
  error: boolean = false;
  isAddMarkupVisible: boolean = true;
  isAddDiscountVisible: boolean = false;
  isAddSupplementsVisible: boolean = false;
  isAddRoomTypesVisible: boolean = false;

}
