import {Component, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {SearchService} from "../../shared/services/search/search.service";
import {MatDialogRef} from "@angular/material/dialog";
import {AdminSearchComponent} from "../../shared/components/admin-search/admin-search.component";

@Component({
  selector: 'app-find-hotel-context',
  templateUrl: './find-hotel-context.component.html',
  styleUrls: ['./find-hotel-context.component.scss']
})
export class FindHotelContextComponent implements OnInit{

  private unsubscribe$: Subject<void> = new Subject<void>();
  resultData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const hotel = params['hotel'];

      this.fetchHotels(hotel);
    });
  }

  fetchHotels(hotel: any) {
    this.searchService.adminSearchData(hotel).subscribe({
      next: (response: any) => {
        console.log(response)
        this.resultData = response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
