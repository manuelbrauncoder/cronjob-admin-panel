import { TestBed } from '@angular/core/testing';

import { CruiseApiService } from './cruise-api.service';

describe('CruiseApiService', () => {
  let service: CruiseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CruiseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
