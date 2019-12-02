import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConceptosExpComponent } from './table-conceptos-exp.component';

describe('TableConceptosExpComponent', () => {
  let component: TableConceptosExpComponent;
  let fixture: ComponentFixture<TableConceptosExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableConceptosExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableConceptosExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
