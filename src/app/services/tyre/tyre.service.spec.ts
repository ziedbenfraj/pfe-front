import { TestBed } from '@angular/core/testing';

import { TyreService } from './tyre.service';

describe('TyreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TyreService = TestBed.get(TyreService);
    expect(service).toBeTruthy();
  });
});
