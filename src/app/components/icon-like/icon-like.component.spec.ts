import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLikeComponent } from './icon-like.component';

describe('IconLikeComponent', () => {
  let component: IconLikeComponent;
  let fixture: ComponentFixture<IconLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
