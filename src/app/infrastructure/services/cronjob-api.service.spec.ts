import { TestBed } from '@angular/core/testing';

import { CronjobApiService } from './cronjob-api.service';

describe('CronjobApiService', () => {
  let service: CronjobApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CronjobApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
