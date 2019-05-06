import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetflowComponent } from './netflow.component';

describe('NetflowComponent', () => {
  let component: NetflowComponent;
  let fixture: ComponentFixture<NetflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
