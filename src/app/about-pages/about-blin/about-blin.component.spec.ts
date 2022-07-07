import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBlinComponent } from './about-blin.component';

describe('AboutBlinComponent', () => {
  let component: AboutBlinComponent;
  let fixture: ComponentFixture<AboutBlinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutBlinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBlinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
