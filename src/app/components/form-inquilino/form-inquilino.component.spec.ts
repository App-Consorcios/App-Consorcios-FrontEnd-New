import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInquilinoComponent } from './form-inquilino.component';

describe('FormInquilinoComponent', () => {
  let component: FormInquilinoComponent;
  let fixture: ComponentFixture<FormInquilinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInquilinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInquilinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
