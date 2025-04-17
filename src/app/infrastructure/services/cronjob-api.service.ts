import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cronjob } from '../../domain/models/cronjob.interface';
import { Log } from '../../domain/models/log.interface';

@Injectable({
  providedIn: 'root'
})
export class CronjobApiService {

  private baseUrl: string = 'http://localhost:2001/jobs';

  constructor(private http: HttpClient) { }

  getJobList(): Observable<HttpResponse<Cronjob[]>> {
    return this.http.get<Cronjob[]>(this.baseUrl, { observe: 'response'});
  }

  getJob({ key }: { key: string }): Observable<Cronjob> {
    const url = `${this.baseUrl}/${key}`;
    return this.http.get<Cronjob>(url);
  }

  getLog({ key }: { key: string }): Observable<Log> {
    const url = `${this.baseUrl}/${key}/logs`;
    return this.http.get<Log>(url);
  }

  executeJob({ key }: { key: string }): Observable<HttpResponse<void>> {
    const url = `${this.baseUrl}/${key}/execute`;
    return this.http.patch<void>(url, { }, { observe: 'response' });
  }

  getLastExecution({ key }: { key: string }): Observable<Cronjob> {
    const url = `${this.baseUrl}/${key}/lastExecution`;
    return this.http.get<Cronjob>(url);
  }
}
