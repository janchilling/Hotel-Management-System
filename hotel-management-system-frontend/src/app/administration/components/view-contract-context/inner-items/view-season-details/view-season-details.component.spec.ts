import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSeasonDetailsComponent } from './view-season-details.component';

describe('ViewSeasonDetailsComponent', () => {
  let component: ViewSeasonDetailsComponent;
  let fixture: ComponentFixture<ViewSeasonDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSeasonDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewSeasonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
