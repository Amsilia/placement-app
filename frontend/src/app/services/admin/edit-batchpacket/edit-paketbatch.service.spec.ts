import { TestBed } from '@angular/core/testing';

import { EditPaketbatchService } from './edit-paketbatch.service';

describe('EditPaketbatchService', () => {
  let service: EditPaketbatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPaketbatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
