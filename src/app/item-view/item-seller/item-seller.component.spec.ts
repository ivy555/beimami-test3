import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSellerComponent } from './item-seller.component';

describe('ItemSellerComponent', () => {
  let component: ItemSellerComponent;
  let fixture: ComponentFixture<ItemSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
