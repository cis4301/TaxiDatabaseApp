MainmapsMainmapsimport { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmapsComponent } from './maps.component';

describe('MainmapsComponent', () => {
  let component: MainmapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
