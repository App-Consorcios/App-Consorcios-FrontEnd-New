import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselMultipleComponent } from './carrousel-multiple.component';

describe('CarrouselMultipleComponent', () => {
  let component: CarrouselMultipleComponent;
  let fixture: ComponentFixture<CarrouselMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrouselMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrouselMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
