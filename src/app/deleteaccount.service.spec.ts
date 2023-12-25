import { TestBed } from '@angular/core/testing';

import { DeleteaccountService } from './deleteaccount.service';

describe('DeleteaccountService', () => {
  let service: DeleteaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
