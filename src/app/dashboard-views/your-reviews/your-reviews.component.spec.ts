import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourReviewsComponent } from './your-reviews.component';

describe('YourReviewsComponent', () => {
  let component: YourReviewsComponent;
  let fixture: ComponentFixture<YourReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});