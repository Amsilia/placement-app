import { TestBed } from '@angular/core/testing';

import { RegistrantService } from './registrant.service';

describe('RegistrantService', () => {
  let service: RegistrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
