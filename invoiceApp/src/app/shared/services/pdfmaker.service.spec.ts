import { TestBed } from '@angular/core/testing';

import { PdfmakerService } from './pdfmaker.service';

describe('PdfmakerService', () => {
  let service: PdfmakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfmakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
