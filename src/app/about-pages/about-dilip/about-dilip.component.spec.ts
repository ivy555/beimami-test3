import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDilipComponent } from './about-dilip.component';

describe('AboutDilipComponent', () => {
  let component: AboutDilipComponent;
  let fixture: ComponentFixture<AboutDilipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDilipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDilipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
