import { TestBed } from '@angular/core/testing';

import { MeasuresService } from './measures.service';

describe('MeasuresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasuresService = TestBed.get(MeasuresService);
    expect(service).toBeTruthy();
  });
});
