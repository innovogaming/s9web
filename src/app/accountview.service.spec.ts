import { TestBed } from '@angular/core/testing';

import { AccountviewService } from './accountview.service';

describe('AccountviewService', () => {
  let service: AccountviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
