import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUnidadComponent } from './select-unidad.component';

describe('SelectUnidadComponent', () => {
  let component: SelectUnidadComponent;
  let fixture: ComponentFixture<SelectUnidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUnidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
