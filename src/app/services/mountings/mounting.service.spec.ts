import { TestBed } from '@angular/core/testing';

import { MountingService } from './mounting.service';

describe('MountingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MountingService = TestBed.get(MountingService);
    expect(service).toBeTruthy();
  });
});
