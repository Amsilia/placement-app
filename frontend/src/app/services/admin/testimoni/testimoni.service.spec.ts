import { TestBed } from '@angular/core/testing';

import { TestimoniService } from './testimoni.service';

describe('TestimoniService', () => {
  let service: TestimoniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimoniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
