import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from "../../../shared/services/search/search.service";
import { SearchParamsService } from "../../../shared/services/searchParams/search-params.service";

@Component({
  selector: 'app-search-results-context',
  templateUrl: './search-results-context.component.html',
  styleUrls: ['./search-results-context.component.scss']
})
export class SearchResultsContextComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  searchParams: any;
  searchData: any = [];

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private searchParamsService: SearchParamsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const destination = params['destination'];
      const noOfRooms = params['noOfRooms'];
      const checkIn = params['checkIn'];
      const checkOut = params['checkOut'];

      this.searchParams = { destination, noOfRooms, checkIn, checkOut };

      // Update SearchParamsService with extracted parameters
      this.searchParamsService.updateSearchParams(this.searchParams);

      // Call the search method with the extracted parameters
      this.search();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search(): void {
    const { destination, noOfRooms, checkIn, checkOut } = this.searchParams;

    this.searchService.getSearchData(destination, noOfRooms, checkIn, checkOut).subscribe(data => {
      // Assign data to searchData array
      this.searchData = data;
      this.searchData = this.searchData.data
      console.log(this.searchData)
    }, error => {
      // Handle errors
      console.error(error);
    });
  }
}
