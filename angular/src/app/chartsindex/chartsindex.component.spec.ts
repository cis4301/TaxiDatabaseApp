import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsindexComponent } from './chartsindex.component';

describe('ChartsindexComponent', () => {
  let component: ChartsindexComponent;
  let fixture: ComponentFixture<ChartsindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
