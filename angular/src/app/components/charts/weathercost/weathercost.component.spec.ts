import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathercostComponent } from './weathercost.component';

describe('WeathercostComponent', () => {
  let component: WeathercostComponent;
  let fixture: ComponentFixture<WeathercostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathercostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathercostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
