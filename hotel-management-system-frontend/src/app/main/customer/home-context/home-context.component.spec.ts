import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContextComponent } from './home-context.component';

describe('HomeContextComponent', () => {
  let component: HomeContextComponent;
  let fixture: ComponentFixture<HomeContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeContextComponent]
    });
    fixture = TestBed.createComponent(HomeContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
