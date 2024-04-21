import {SeasonDiscountDetails} from "./season-discount-details";

export interface DiscountDetails{
  discountId: number;
  discountName: string;
  discountCode: string;
  discountDescription: string;
  discountImageURL: string;
  contractId: number;
  contractStatus: string;
  hotelId: number;
  hotelName: string;
  seasonDiscounts: SeasonDiscountDetails[]
}
