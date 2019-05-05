import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathertypemapComponent } from './weathertypemap.component';

describe('WeathertypemapComponent', () => {
  let component: WeathertypemapComponent;
  let fixture: ComponentFixture<WeathertypemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathertypemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathertypemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
