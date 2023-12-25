import { TestBed } from '@angular/core/testing';

import { EditbetService } from './editbet.service';

describe('EditbetService', () => {
  let service: EditbetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditbetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
