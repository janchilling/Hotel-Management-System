import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderNavbarComponent } from './main-header-navbar.component';

describe('MainHeaderNavbarComponent', () => {
  let component: MainHeaderNavbarComponent;
  let fixture: ComponentFixture<MainHeaderNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainHeaderNavbarComponent]
    });
    fixture = TestBed.createComponent(MainHeaderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
