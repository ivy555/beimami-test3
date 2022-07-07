import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutJohnComponent } from './about-john.component';

describe('AboutJohnComponent', () => {
  let component: AboutJohnComponent;
  let fixture: ComponentFixture<AboutJohnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutJohnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutJohnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
