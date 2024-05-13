import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.scss']
})
export class AdminSearchComponent {

  @Output() searchSubmitted = new EventEmitter();
  adminSearchForm!: FormGroup
  hotel: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.adminSearchForm = this.formBuilder.group({
      hotel: ['', Validators.required],
    });
  }

  onSubmit() {
    const hotel = this.adminSearchForm.value.hotel;
    this.searchSubmitted.emit();
    this.router.navigate(['/administration/find'], {queryParams: {hotel}});
  }

}
