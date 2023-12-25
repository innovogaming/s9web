import { TestBed } from '@angular/core/testing';

import { GetbetService } from './getbet.service';

describe('GetbetService', () => {
  let service: GetbetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetbetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
