import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEventsComponent } from './home-events.component';

describe('HomeEventsComponent', () => {
  let component: HomeEventsComponent;
  let fixture: ComponentFixture<HomeEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeEventsComponent]
    });
    fixture = TestBed.createComponent(HomeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
