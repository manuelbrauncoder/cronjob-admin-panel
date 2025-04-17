import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CronJob } from '../../domain/models/cronjob.interface';
import { Log } from '../../domain/models/log.interface';
import { CronJobRepository } from '../../domain/services/cronjob-repository';

@Injectable({
  providedIn: 'root'
})
export class CronjobApiService extends CronJobRepository {

  private baseUrl: string = 'http://localhost:2001/jobs';

  constructor(private http: HttpClient) { 
    super();
  }

  getJobList(): Observable<HttpResponse<CronJob[]>> {
    return this.http.get<CronJob[]>(this.baseUrl, { observe: 'response'});
  }

  getJob({ key }: { key: string }): Observable<CronJob> {
    const url = `${this.baseUrl}/${key}`;
    return this.http.get<CronJob>(url);
  }

  getLog({ key }: { key: string }): Observable<Log> {
    const url = `${this.baseUrl}/${key}/logs`;
    return this.http.get<Log>(url);
  }

  executeJob({ key }: { key: string }): Observable<HttpResponse<void>> {
    const url = `${this.baseUrl}/${key}/execute`;
    return this.http.patch<void>(url, { }, { observe: 'response' });
  }

  getLastExecution({ key }: { key: string }): Observable<CronJob> {
    const url = `${this.baseUrl}/${key}/lastExecution`;
    return this.http.get<CronJob>(url);
  }
}
