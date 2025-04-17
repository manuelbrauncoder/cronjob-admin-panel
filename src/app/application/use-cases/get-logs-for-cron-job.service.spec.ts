import { TestBed } from '@angular/core/testing';

import { GetLogsForCronJobService } from './get-logs-for-cron-job.service';

describe('GetLogsForCronJobService', () => {
  let service: GetLogsForCronJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLogsForCronJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
