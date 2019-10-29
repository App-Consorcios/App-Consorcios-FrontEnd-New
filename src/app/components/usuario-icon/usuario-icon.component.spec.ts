import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioIconComponent } from './usuario-icon.component';

describe('UsuarioIconComponent', () => {
  let component: UsuarioIconComponent;
  let fixture: ComponentFixture<UsuarioIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
