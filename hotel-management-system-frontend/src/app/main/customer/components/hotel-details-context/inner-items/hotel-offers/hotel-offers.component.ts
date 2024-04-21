import {Component, Input, OnInit} from '@angular/core';
import {DiscountServicesService} from "../../../../../../shared/services/discountServices/discount-services.service";
import {StandardResponse} from "../../../../../../shared/interfaces/standard-response";
import {DiscountDetails} from "../../../../../../shared/interfaces/discount-details";

@Component({
  selector: 'app-hotel-offers',
  templateUrl: './hotel-offers.component.html',
  styleUrls: ['./hotel-offers.component.scss']
})
export class HotelOffersComponent implements OnInit{

  @Input() contractId: any
  discountDetails: any
  isLoading: boolean = false
  isError: boolean = false
  errorMsg: string | null = null;

  constructor(
    private discountService: DiscountServicesService
  ) { }

  ngOnInit(): void {
    this.fetchDiscounts();
  }

  fetchDiscounts() {
    this.isLoading = true;
    this.discountService.getDiscounts(this.contractId).subscribe({
      next: (response : StandardResponse<DiscountDetails>) => {
        this.isLoading = false;
        if (response.statusCode === 200){
          this.discountDetails = response.data;
        } else {
          console.log(response);
        }
      },
      error: (error) => {
        console.error('Error fetching Discounts in component:', error);
        this.isError = true;
        this.errorMsg = error; // Display custom error message to the user
        this.isLoading = false;
      }
    });
  }


}
