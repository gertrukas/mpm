import { TestBed } from '@angular/core/testing';

import { SEOService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
