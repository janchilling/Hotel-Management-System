import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from "../../../../shared/services/search/search.service";
import { SearchParamsService } from "../../../../shared/services/searchParams/search-params.service";

@Component({
  selector: 'app-search-results-context',
  templateUrl: './search-results-context.component.html',
  styleUrls: ['./search-results-context.component.scss']
})
export class SearchResultsContextComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  searchParams: any;
  searchData: any = [];
  isLoading: boolean = false;
  isError: boolean = false;
  numberOfHotels: any;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private searchParamsService: SearchParamsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const destination = params['destination'];
      const noOfRooms = params['noOfRooms'];
      const noofPersons = params['noofPersons'];
      const checkIn = params['checkIn'];
      const checkOut = params['checkOut'];

      this.searchParams = { destination, noOfRooms, noofPersons, checkIn, checkOut };

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

    this.searchService.getSearchData(destination, noOfRooms, checkIn, checkOut).subscribe({
      next: (response: any) => {
        if(response.statusCode === 200){
          this.searchData = response.data;
          this.numberOfHotels = this.searchData.length; // Count the elements in the array
          this.isLoading = false;
          console.log(this.searchData);
        } else if(response.statusCode === 500){
          console.log(response)
          this.isLoading = false;
          this.isError = true;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
