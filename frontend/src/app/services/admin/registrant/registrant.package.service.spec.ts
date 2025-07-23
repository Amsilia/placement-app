import { TestBed } from '@angular/core/testing';

import { RegistrantPackageService } from './registrant.package.service';

describe('RegistrantPackageService', () => {
  let service: RegistrantPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrantPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
