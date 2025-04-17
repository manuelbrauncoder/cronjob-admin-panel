import { Observable } from "rxjs";
import { Cronjob } from "../models/cronjob.interface";
import { Log } from "../models/log.interface";
import { HttpResponse } from "@angular/common/http";

export abstract class CronJobRepository {

    abstract getJobList(): Observable<HttpResponse<Cronjob[]>>;

    abstract getJob({ key }: { key: string }): Observable<Cronjob>;

    abstract getLog({ key }: { key: string }): Observable<Log>;

    abstract executeJob({ key }: { key: string }): Observable<HttpResponse<void>>;

    abstract getLastExecution({ key }: { key: string }): Observable<Cronjob>;
}