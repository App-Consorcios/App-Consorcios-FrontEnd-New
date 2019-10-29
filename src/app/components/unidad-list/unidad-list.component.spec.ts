import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadListComponent } from './unidad-list.component';

describe('UnidadListComponent', () => {
  let component: UnidadListComponent;
  let fixture: ComponentFixture<UnidadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
