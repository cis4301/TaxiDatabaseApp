import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsindexComponent } from './mapsindex.component';

describe('MapsindexComponent', () => {
  let component: MapsindexComponent;
  let fixture: ComponentFixture<MapsindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
