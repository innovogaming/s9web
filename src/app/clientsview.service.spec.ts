import { TestBed } from '@angular/core/testing';

import { ClientsviewService } from './clientsview.service';

describe('ClientsviewService', () => {
  let service: ClientsviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
