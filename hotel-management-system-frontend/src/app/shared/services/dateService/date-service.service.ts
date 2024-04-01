import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  constructor() { }

  formatDate(date: Date): string {
    // Format date in SQL format (YYYY-MM-DD)
    return date.toISOString().split('T')[0];
  }
}
