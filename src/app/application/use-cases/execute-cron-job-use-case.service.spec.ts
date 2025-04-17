import { TestBed } from '@angular/core/testing';

import { ExecuteCronJobUseCaseService } from './execute-cron-job-use-case.service';

describe('ExecuteCronJobUseCaseService', () => {
  let service: ExecuteCronJobUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecuteCronJobUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
