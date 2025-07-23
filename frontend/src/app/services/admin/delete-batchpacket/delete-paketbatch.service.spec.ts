import { TestBed } from '@angular/core/testing';

import { DeletePaketbatchService } from './delete-paketbatch.service';

describe('DeletePaketbatchService', () => {
  let service: DeletePaketbatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePaketbatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
