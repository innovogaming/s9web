import { TestBed } from '@angular/core/testing';

import { CompleteuserService } from './completeuser.service';

describe('CompleteuserService', () => {
  let service: CompleteuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
