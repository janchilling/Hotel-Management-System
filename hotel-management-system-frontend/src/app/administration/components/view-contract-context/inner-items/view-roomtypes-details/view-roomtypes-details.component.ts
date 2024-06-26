import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-roomtypes-details',
  templateUrl: './view-roomtypes-details.component.html',
  styleUrls: ['./view-roomtypes-details.component.scss']
})
export class ViewRoomtypesDetailsComponent {

  @Input() contractDetails: any;
  roomTypeDetailsForm!: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.roomTypeDetailsForm = this.formBuilder.group({
      roomTypeDetails: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.contractDetails) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.roomTypeDetailsForm = this.formBuilder.group({
      roomTypeDetails: this.formBuilder.array([])
    });

    const roomTypeDetailsArray = this.roomTypeDetailsForm.get('roomTypeDetails') as FormArray;
    this.contractDetails.roomTypes.forEach((roomType: any) => {
      const roomTypeGroup = this.formBuilder.group({
        roomTypeId: [roomType.roomTypeId],
        roomTypeName: [roomType.roomTypeName],
        roomDimensions: [roomType.roomDimensions],
        maxAdults: [roomType.maxAdults],
        seasonRoomTypes: this.initializeSeasonRoomTypes(roomType.seasonRoomtype)
      });
      roomTypeDetailsArray.push(roomTypeGroup);
    });
  }

  initializeSeasonRoomTypes(seasonRoomtypes: any[]) {
    const seasonRoomTypesArray = this.formBuilder.array([]);
    seasonRoomtypes.forEach((seasonRoomType: any) => {
      const seasonRoomTypeGroup = this.formBuilder.group({
        roomTypePrice: [seasonRoomType.roomTypePrice],
        seasonId: [seasonRoomType.seasonId],
        seasonName: [seasonRoomType.seasonName],
        noOfRooms: [seasonRoomType.noOfRooms]
      });
      (seasonRoomTypesArray as FormArray).push(seasonRoomTypeGroup);
    });
    return seasonRoomTypesArray;
  }

  handleUpdate() {
    const resource = 'roomType';
    if (this.contractDetails && this.contractDetails.contractId) {
      const contractId = this.contractDetails.contractId;
      this.router.navigate([`/administration/update/${contractId}`], { queryParams: { resource } });
    } else {
      console.error('Contract details or contractId is missing.');
    }
  }

}
