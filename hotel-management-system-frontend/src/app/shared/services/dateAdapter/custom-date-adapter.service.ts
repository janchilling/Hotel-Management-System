import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${year}-${this.pad(month)}-${this.pad(day)}`;
    }
    return date.toDateString();
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}
