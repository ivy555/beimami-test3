import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookInfoComponent } from './cook-info.component';

describe('CookInfoComponent', () => {
  let component: CookInfoComponent;
  let fixture: ComponentFixture<CookInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
