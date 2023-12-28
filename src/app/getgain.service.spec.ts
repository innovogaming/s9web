import { TestBed } from '@angular/core/testing';

import { GetgainService } from './getgain.service';

describe('GetgainService', () => {
  let service: GetgainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetgainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
