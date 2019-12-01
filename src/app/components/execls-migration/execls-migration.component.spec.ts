import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExeclsMigrationComponent } from './execls-migration.component';

describe('ExeclsMigrationComponent', () => {
  let component: ExeclsMigrationComponent;
  let fixture: ComponentFixture<ExeclsMigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExeclsMigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExeclsMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
