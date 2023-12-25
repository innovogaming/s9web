import { TestBed } from '@angular/core/testing';

import { AddaccountService } from './addaccount.service';

describe('AddaccountService', () => {
  let service: AddaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
