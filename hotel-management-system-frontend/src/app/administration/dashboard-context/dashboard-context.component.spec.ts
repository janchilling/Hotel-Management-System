import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContextComponent } from './dashboard-context.component';

describe('DashboardContextComponent', () => {
  let component: DashboardContextComponent;
  let fixture: ComponentFixture<DashboardContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardContextComponent]
    });
    fixture = TestBed.createComponent(DashboardContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
