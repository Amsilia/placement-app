import { TestBed } from '@angular/core/testing';

import { EditArtikelService } from './edit-artikel.service';

describe('EditArtikelService', () => {
  let service: EditArtikelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditArtikelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
