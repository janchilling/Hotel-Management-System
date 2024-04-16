import {Component, Input, OnInit} from '@angular/core';
import {DiscountServicesService} from "../../../../../shared/services/discountServices/discount-services.service";

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

  constructor(
    private discountService: DiscountServicesService
  ) {
  }

  ngOnInit(): void {
    this.fetchDiscounts()
  }

  fetchDiscounts() {
    this.isLoading = true
    this.discountService.getDiscounts(this.contractId).subscribe({
      next: (response) => {
        this.isLoading = false
        if (response.statusCode === 200){
          this.discountDetails = response.data
        }else {
          console.log(response);
        }

      },
      error: () => {
        this.isError = true
        this.isLoading = false
      }
    })

  }

}
