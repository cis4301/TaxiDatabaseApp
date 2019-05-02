import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapresultComponent } from './mapresult.component';

describe('MapresultComponent', () => {
  let component: MapresultComponent;
  let fixture: ComponentFixture<MapresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
