import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAdnanComponent } from './about-adnan.component';

describe('AboutAdnanComponent', () => {
  let component: AboutAdnanComponent;
  let fixture: ComponentFixture<AboutAdnanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAdnanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAdnanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
