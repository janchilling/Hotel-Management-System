import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainButtonComponent } from './main-button.component';

describe('MainButtonComponent', () => {
  let component: MainButtonComponent;
  let fixture: ComponentFixture<MainButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainButtonComponent]
    });
    fixture = TestBed.createComponent(MainButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
