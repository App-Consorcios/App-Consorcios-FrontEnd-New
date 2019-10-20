import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleExpensasComponent } from './detalle-expensas.component';

describe('DetalleExpensasComponent', () => {
  let component: DetalleExpensasComponent;
  let fixture: ComponentFixture<DetalleExpensasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleExpensasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleExpensasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
