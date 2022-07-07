import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAleemComponent } from './about-aleem.component';

describe('AboutAleemComponent', () => {
  let component: AboutAleemComponent;
  let fixture: ComponentFixture<AboutAleemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAleemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAleemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
