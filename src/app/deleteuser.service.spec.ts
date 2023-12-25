import { TestBed } from '@angular/core/testing';

import { DeleteuserService } from './deleteuser.service';

describe('DeleteuserService', () => {
  let service: DeleteuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
