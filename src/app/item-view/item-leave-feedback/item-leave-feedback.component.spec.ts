import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLeaveFeedbackComponent } from './item-leave-feedback.component';

describe('ItemLeaveFeedbackComponent', () => {
  let component: ItemLeaveFeedbackComponent;
  let fixture: ComponentFixture<ItemLeaveFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemLeaveFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLeaveFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
