import { Injectable } from '@angular/core';
import { CronJobRepository } from '../../domain/services/cronjob-repository';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExecuteCronJobUseCaseService {

  constructor(private readonly repo: CronJobRepository) {}

  execute({ key }: { key: string }): Observable<HttpResponse<void>> {
    return this.repo.executeJob({ key: key });
  }
}
