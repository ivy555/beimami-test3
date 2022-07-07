import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsSaleComponent } from './items-sale.component';

describe('ItemsSaleComponent', () => {
  let component: ItemsSaleComponent;
  let fixture: ComponentFixture<ItemsSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
