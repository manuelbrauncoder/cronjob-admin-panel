import { TestBed } from '@angular/core/testing';

import { GetLastLogUseCaseService } from './get-last-log-use-case.service';

describe('GetLastLogUseCaseService', () => {
  let service: GetLastLogUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLastLogUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
