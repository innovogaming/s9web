import { TestBed } from '@angular/core/testing';

import { SorteosService } from './sorteos.service';

describe('SorteosService', () => {
  let service: SorteosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SorteosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
