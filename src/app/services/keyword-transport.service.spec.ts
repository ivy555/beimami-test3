import { TestBed } from '@angular/core/testing';

import { KeywordTransportService } from './keyword-transport.service';

describe('KeywordTransportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeywordTransportService = TestBed.get(KeywordTransportService);
    expect(service).toBeTruthy();
  });
});
