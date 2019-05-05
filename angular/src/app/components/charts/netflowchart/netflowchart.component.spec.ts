import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetflowchartComponent } from './netflowchart.component';

describe('NetflowchartComponent', () => {
  let component: NetflowchartComponent;
  let fixture: ComponentFixture<NetflowchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetflowchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetflowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
