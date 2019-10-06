import { TestBed } from '@angular/core/testing';

import { UnidadFuncionalService } from './unidad-funcional.service';

describe('UnidadFuncionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadFuncionalService = TestBed.get(UnidadFuncionalService);
    expect(service).toBeTruthy();
  });
});
