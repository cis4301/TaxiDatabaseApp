import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindmapComponent } from './windmap.component';

describe('WindmapComponent', () => {
  let component: WindmapComponent;
  let fixture: ComponentFixture<WindmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
