import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUmerComponent } from './about-umer.component';

describe('AboutUmerComponent', () => {
  let component: AboutUmerComponent;
  let fixture: ComponentFixture<AboutUmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
