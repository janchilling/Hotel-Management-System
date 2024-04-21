import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHotelsBottomContainerComponent } from './all-hotels-bottom-container.component';

describe('AllHotelsBottomContainerComponent', () => {
  let component: AllHotelsBottomContainerComponent;
  let fixture: ComponentFixture<AllHotelsBottomContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllHotelsBottomContainerComponent]
    });
    fixture = TestBed.createComponent(AllHotelsBottomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
