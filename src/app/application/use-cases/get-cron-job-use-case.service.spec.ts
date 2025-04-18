import { TestBed } from '@angular/core/testing';

import { GetCronJobUseCaseService } from './get-cron-job-use-case.service';

describe('GetCronJobUseCaseService', () => {
  let service: GetCronJobUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCronJobUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
