import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator function to enforce minimum and maximum values
export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value !== null && (isNaN(value) || value < min || value > max)) {
      return { 'range': true };
    }
    return null;
  };
}
