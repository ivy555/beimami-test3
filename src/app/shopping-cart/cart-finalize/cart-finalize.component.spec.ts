import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFinalizeComponent } from './cart-finalize.component';

describe('CartFinalizeComponent', () => {
  let component: CartFinalizeComponent;
  let fixture: ComponentFixture<CartFinalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartFinalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
