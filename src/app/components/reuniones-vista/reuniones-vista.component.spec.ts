import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionesVistaComponent } from './reuniones-vista.component';

describe('ReunionesVistaComponent', () => {
  let component: ReunionesVistaComponent;
  let fixture: ComponentFixture<ReunionesVistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionesVistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionesVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
