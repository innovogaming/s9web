import { TestBed } from '@angular/core/testing';

import { EdituserService } from './edituser.service';

describe('EdituserService', () => {
  let service: EdituserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdituserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
