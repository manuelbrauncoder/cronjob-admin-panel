import { Injectable } from '@angular/core';
import { CronJobRepository } from '../../domain/services/cronjob-repository';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CronJob } from '../../domain/models/cronjob.interface';

@Injectable({
  providedIn: 'root'
})
export class GetCronJobUseCaseService {

  constructor(private readonly repo: CronJobRepository) {}

  execute({ key }: { key: string }): Observable<HttpResponse<CronJob>> {
    return this.repo.getJob({ key: key });
  }
}
