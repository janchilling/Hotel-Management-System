import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SeasonServicesService } from '../../../../shared/services/seasonServices/season-services.service';
import {DiscountServicesService} from "../../../../shared/services/discountServices/discount-services.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddContractDetailsContextComponent} from "../../add-contract-details-context.component";

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {
  discountForm: FormGroup;
  contractId: any;
  seasons: any[] = [];
  seasonDiscountCount: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private discountService: DiscountServicesService,
    private seasonServicesService: SeasonServicesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private addContractDetailsContextComponent: AddContractDetailsContextComponent
  ) {
    this.discountForm = this.fb.group({
      discounts: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.contractId = params['contractId'];
    });
    this.loadSeasons();
  }

  loadSeasons() {
    this.seasonServicesService.getSeasonsByContractId(this.contractId).subscribe({
      next: (response) => {
        this.seasons = response;
        this.seasonDiscountCount = this.seasons.length;
        this.addDiscountControls();
      },
      error: (error) => {
        console.error('Failed to load seasons:', error);
      }
    });
  }

  addDiscountControls() {
    const discountsArray = this.discountForm.get('discounts') as FormArray;
      discountsArray.push(this.createDiscountFormGroup());
  }

  createDiscountFormGroup(): FormGroup {
    const discountGroup = this.fb.group({
      discountName: ['', Validators.required],
      discountCode: ['', Validators.required],
      contractId: [this.contractId],
      discountDescription: ['', Validators.required],
      seasonDiscounts: this.fb.array([])
    });
    // Initialize season discounts
    for (let i = 0; i < this.seasonDiscountCount; i++) {
      const seasonId = this.seasons[i].seasonId; // Get the season ID
      const seasonDiscountGroup = this.createSeasonDiscountFormGroup(seasonId); // Create the season discount form group with seasonId
      (discountGroup.get('seasonDiscounts') as FormArray).push(seasonDiscountGroup); // Push the form group into the seasonDiscounts array
    }
    return discountGroup;
  }

  addDiscount() {
    this.discountsArray.push(this.createDiscountFormGroup());
  }

  createSeasonDiscountFormGroup(seasonId: number): FormGroup {
    return this.fb.group({
      seasonId: [seasonId], // Track the season ID here
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  removeSeasonDiscount(discountIndex: number, seasonIndex: number) {
    const seasonDiscounts = ((this.discountForm.get('discounts') as FormArray).at(discountIndex).get('seasonDiscounts') as FormArray);
    seasonDiscounts.removeAt(seasonIndex);
  }

  getDiscountFormGroup(index: number): FormGroup {
    return (this.discountForm.get('discounts') as FormArray).at(index) as FormGroup;
  }

  get discountsArray() {
    return this.discountForm.get('discounts') as FormArray;
  }


  getSeasonDiscounts(discountIndex: number): FormArray {
    return this.getDiscountFormGroup(discountIndex).get('seasonDiscounts') as FormArray;
  }

  getSeasonDiscountFormGroup(discountIndex: number, seasonIndex: number): FormGroup {
    return this.getSeasonDiscounts(discountIndex).at(seasonIndex) as FormGroup;
  }


  onSubmit() {
    if (this.discountForm.valid) {
      // Extract season details from the form
      const dataToSend = this.discountForm.get("discounts")?.value;

      console.log(dataToSend);
      this.discountService.addDiscount(dataToSend).subscribe({
        next: (response) => {
          console.log('Discount details sent successfully:', response);
          this.router.navigate(['/administration/addSupplement'], { queryParams: { contractId: this.contractId } });
        },
        error: (error) => {
          console.error('Failed to send discount details:', error);
        }
      });
    }
  }


}
