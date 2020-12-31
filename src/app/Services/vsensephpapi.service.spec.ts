import { TestBed } from '@angular/core/testing';

import { VsensephpapiService } from './vsensephpapi.service';

describe('VsensephpapiService', () => {
  let service: VsensephpapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VsensephpapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
