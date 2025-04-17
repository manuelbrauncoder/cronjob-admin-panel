import { Injectable } from '@angular/core';
import { CronJobRepository } from '../../domain/services/cronjob-repository';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Cronjob } from '../../domain/models/cronjob.interface';

@Injectable({
  providedIn: 'root',
})
export class GetCronjobsUseCaseService {
  constructor(private readonly repo: CronJobRepository) {}

  execute(): Observable<HttpResponse<Cronjob[]>> {
    return this.repo.getJobList();
  }
}
