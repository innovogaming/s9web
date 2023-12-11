import { TestBed } from '@angular/core/testing';

import { UsersviewService } from './usersview.service';

describe('UsersviewService', () => {
  let service: UsersviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
