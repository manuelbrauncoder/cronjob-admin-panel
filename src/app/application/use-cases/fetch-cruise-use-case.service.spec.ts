import { TestBed } from '@angular/core/testing';

import { FetchCruiseUseCaseService } from './fetch-cruise-use-case.service';

describe('FetchCruiseUseCaseService', () => {
  let service: FetchCruiseUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCruiseUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
