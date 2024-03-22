// search-params.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {
  private searchParamsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public searchParams$ = this.searchParamsSubject.asObservable();

  constructor() { }

  updateSearchParams(params: any): void {
    this.searchParamsSubject.next(params);
  }
}
