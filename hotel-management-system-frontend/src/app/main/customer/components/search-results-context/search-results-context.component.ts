import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from "../../../../shared/services/search/search.service";
import { SearchParamsService } from "../../../../shared/services/searchParams/search-params.service";
import {HotelDetails} from "../../../../shared/interfaces/hotel-details";
import {StandardResponse} from "../../../../shared/interfaces/standard-response";

@Component({
  selector: 'app-search-results-context',
  templateUrl: './search-results-context.component.html',
  styleUrls: ['./search-results-context.component.scss']
})
export class SearchResultsContextComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  searchParams: any;
  searchData: HotelDetails[] = [];
  isLoading = false;
  isError = false;
  numberOfHotels: number = 0;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private searchParamsService: SearchParamsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.searchParams = { ...params };
      this.searchParamsService.updateSearchParams(this.searchParams);
      this.search();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search(): void {
    this.isLoading = true;
    const { destination, noOfRooms, checkIn, checkOut } = this.searchParams;

    this.searchService.getSearchData(destination, noOfRooms, checkIn, checkOut)
      .subscribe({
        next: (response: StandardResponse<HotelDetails>) => {
          if (response.statusCode === 200) {
            this.searchData = response.data;
            this.numberOfHotels = this.searchData.length;
          } else if (response.statusCode === 500) {
            console.log(response);
            this.isError = true;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
          this.isError = true;
        }
      });
  }

}
