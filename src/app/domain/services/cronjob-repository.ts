import { Observable } from "rxjs";
import { CronJob } from "../models/cronjob.interface";
import { Log } from "../models/log.interface";
import { HttpResponse } from "@angular/common/http";

export abstract class CronJobRepository {

    abstract getJobList(): Observable<HttpResponse<CronJob[]>>;

    abstract getJob({ key }: { key: string }): Observable<HttpResponse<CronJob>>;

    abstract getLogsForJob({ key }: { key: string }): Observable<HttpResponse<Log[]>>;

    abstract executeJob({ key }: { key: string }): Observable<HttpResponse<void>>;

    abstract getLastExecution({ key }: { key: string }): Observable<HttpResponse<Log>>;
}