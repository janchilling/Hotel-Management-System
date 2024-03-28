import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SeasonServicesService } from '../../../../shared/services/seasonServices/season-services.service';
import { SupplementServicesService } from "../../../../shared/services/supplementServices/supplement-services.service";
import { AngularFireStorage, AngularFireStorageReference } from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-supplement-details',
  templateUrl: './supplement-details.component.html',
  styleUrls: ['./supplement-details.component.scss']
})
export class SupplementDetailsComponent implements OnInit {
  supplementForm: FormGroup;
  contractId: any;
  seasons: any[] = [];
  seasonSupplementCount: any;
  images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private supplementService: SupplementServicesService,
    private seasonServicesService: SeasonServicesService,
    private storage: AngularFireStorage
  ) {
    this.supplementForm = this.fb.group({
      supplements: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.contractId = params['contractId'];
    });
    this.loadSeasons();
  }

  loadSeasons() {
    this.seasonServicesService.getSeasonsByContractId(this.contractId).subscribe(
      (response) => {
        this.seasons = response;
        this.seasonSupplementCount = this.seasons.length;
        this.addSupplementControls();
      },
      (error) => {
        console.error('Failed to load seasons:', error);
      }
    );
  }

  addSupplementControls() {
    const supplementsArray = this.supplementForm.get('supplements') as FormArray;
    supplementsArray.push(this.createSupplementFormGroup());
  }

  createSupplementFormGroup(): FormGroup {
    const supplementGroup = this.fb.group({
      supplementName: ['', Validators.required],
      contractId: [this.contractId],
      supplementDescription: ['', Validators.required],
      seasonSupplements: this.fb.array([])
    });
    // Initialize season supplements
    for (let i = 0; i < this.seasonSupplementCount; i++) {
      const seasonId = this.seasons[i].seasonId; // Get the season ID
      const seasonSupplementGroup = this.createSeasonSupplementFormGroup(seasonId); // Create the season supplement form group with seasonId
      (supplementGroup.get('seasonSupplements') as FormArray).push(seasonSupplementGroup); // Push the form group into the seasonSupplements array
    }
    return supplementGroup;
  }

  addSupplement() {
    this.supplementsArray.push(this.createSupplementFormGroup());
  }

  createSeasonSupplementFormGroup(seasonId: number): FormGroup {
    return this.fb.group({
      seasonId: [seasonId], // Track the season ID here
      supplementPrice: ['', [Validators.required]]
    });
  }

  removeSeasonSupplement(supplementIndex: number, seasonIndex: number) {
    const seasonSupplements = ((this.supplementForm.get('supplements') as FormArray).at(supplementIndex).get('seasonSupplements') as FormArray);
    seasonSupplements.removeAt(seasonIndex);
  }

  getSupplementFormGroup(index: number): FormGroup {
    return (this.supplementForm.get('supplements') as FormArray).at(index) as FormGroup;
  }

  get supplementsArray() {
    return this.supplementForm.get('supplements') as FormArray;
  }

  getSeasonSupplements(supplementIndex: number): FormArray {
    return this.getSupplementFormGroup(supplementIndex).get('seasonSupplements') as FormArray;
  }

  getSeasonSupplementFormGroup(supplementIndex: number, seasonIndex: number): FormGroup {
    return this.getSeasonSupplements(supplementIndex).at(seasonIndex) as FormGroup;
  }

  validateImage(control: any) {
    const file = control.value;
    if (file) {
      // Check if file type exists and is an image or .ico file
      if (file.type && (file.type.startsWith('image/') || file.type === 'image/x-icon' || file.name.endsWith('.ico'))) {
        const img = new Image();
        img.onload = () => {
          if (img.width !== 16 || img.height !== 16) {
            control.setErrors({ invalidDimensions: true });
          } else {
            control.setErrors(null);
          }
        };
        img.src = window.URL.createObjectURL(file);
      } else {
        // Handle invalid file types
        control.setErrors({ invalidFileType: true });
      }
    }
    return null;
  }

  onFileSelected(event: any, supplementIndex: number) {
    const file = event.target.files[0];

    if (!this.images) {
      this.images = [];
    }

    if (!this.images[supplementIndex]) {
      this.images[supplementIndex] = [];
    }

    this.images[supplementIndex][0] = file;
  }


  onSubmit() {
    if (this.supplementForm.valid) {
      const supplements = this.supplementForm.value.supplements;

      supplements.forEach((supplement: any, supplementIndex: number) => {
        const file = this.images[supplementIndex][0];
        const filePath = `supplement-icons/${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);

        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              supplement.imageIconURL = url;
            });
          })
        ).subscribe();
      });
        this.sendSupplementData(supplements);
    }
  }


  sendSupplementData(supplements: any[]) {
    console.log('Supplement data to be sent to the backend:', supplements);
    this.supplementService.addSupplement(supplements).subscribe(
      (response) => {
        console.log('Supplement details sent successfully:', response);
      },
      (error) => {
        console.error('Failed to send supplement details:', error);
      }
    );
  }
}
