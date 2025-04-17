import { Injectable } from '@angular/core';
import { CronJobRepository } from '../../domain/services/cronjob-repository';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Log } from '../../domain/models/log.interface';

@Injectable({
  providedIn: 'root',
})
export class GetLogsForCronJobService {
  constructor(private readonly repo: CronJobRepository) {}

  execute({ key }: { key: string }): Observable<HttpResponse<Log[]>> {
    return this.repo.getLogsForJob({ key: key });
  }
}
