import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathertripavgComponent } from './Weathertripavg.component';

describe('WeathertripavgComponent', () => {
  let component: WeathertripavgComponent;
  let fixture: ComponentFixture<WeathertripavgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathertripavgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathertripavgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
