import { TestBed } from '@angular/core/testing';
import { CustomDateAdapter } from './custom-date-adapter.service';

describe('CustomDateAdapter', () => {
  let adapter: CustomDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomDateAdapter]
    });
    adapter = TestBed.inject(CustomDateAdapter);
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should format date for input display format', () => {
    const date = new Date(2024, 4, 12); // May 12, 2024
    const formattedDate = adapter.format(date, 'input');
    expect(formattedDate).toEqual('2024-05-12');
  });

  it('should format date for other display formats', () => {
    const date = new Date(2024, 4, 12); // May 12, 2024
    const formattedDate = adapter.format(date, {});
    expect(formattedDate).toEqual('Sun May 12 2024');
  });

  it('should pad single-digit month and day with zero', () => {
    const date = new Date(2024, 8, 5); // September 5, 2024
    const formattedDate = adapter.format(date, 'input');
    expect(formattedDate).toEqual('2024-09-05');
  });
});
