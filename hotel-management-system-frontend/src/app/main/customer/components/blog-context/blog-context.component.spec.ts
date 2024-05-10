import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContextComponent } from './blog-context.component';

describe('BlogContextComponent', () => {
  let component: BlogContextComponent;
  let fixture: ComponentFixture<BlogContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogContextComponent]
    });
    fixture = TestBed.createComponent(BlogContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
