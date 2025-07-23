import { TestBed } from '@angular/core/testing';

import { SettingSitesService } from './setting-sites.service';

describe('SettingSitesService', () => {
  let service: SettingSitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingSitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
