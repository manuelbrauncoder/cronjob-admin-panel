import { TestBed } from '@angular/core/testing';

import { GetCronjobsUseCaseService } from './get-cronjobs-use-case.service';

describe('GetCronjobsUseCaseService', () => {
  let service: GetCronjobsUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCronjobsUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
