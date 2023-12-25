import { TestBed } from '@angular/core/testing';

import { EditaccountService } from './editaccount.service';

describe('EditaccountService', () => {
  let service: EditaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
