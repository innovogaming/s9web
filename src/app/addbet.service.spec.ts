import { TestBed } from '@angular/core/testing';

import { AddbetService } from './addbet.service';

describe('AddbetService', () => {
  let service: AddbetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddbetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
