import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkupDetailsComponent } from './markup-details.component';

describe('MarkupDetailsComponent', () => {
  let component: MarkupDetailsComponent;
  let fixture: ComponentFixture<MarkupDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkupDetailsComponent]
    });
    fixture = TestBed.createComponent(MarkupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
