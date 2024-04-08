import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchService} from "../../../../shared/services/search/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  @Output() submitClicked = new EventEmitter<any>()
  adminSearchForm!: FormGroup
  hotel: any;
  searchData: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService) {
  }
  ngOnInit(): void {
    this.adminSearchForm = this.formBuilder.group({
      hotel: ['', Validators.required],
    });
  }

  onSubmit(){
    const hotel = this.adminSearchForm.value.hotel;
    this.searchService.adminSearchData(hotel).subscribe({
      next: (response: any) => {
        this.searchData = response;
        this.submitClicked.emit(this.searchData);
        console.log(this.searchData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
