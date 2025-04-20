import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetLogsForCronJobUseCaseService } from '../../../application/use-cases/get-logs-for-cron-job-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { Log } from '../../../domain/models/log.interface';
import { GetCronJobUseCaseService } from '../../../application/use-cases/get-cron-job-use-case.service';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { BoolToTextPipe } from '../../pipes/bool-to-text.pipe';
import { CronExpressionDescriptionPipe } from '../../pipes/cron-expression-description.pipe';
import { HandleKeyPipe } from '../../pipes/handle-key.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { Duration } from '../../interfaces/duration.interface';
import { DurationHelper } from '../../utils/DurationHelper';
import { LogTableComponent } from "../../components/log-table/log-table.component";
import { LogListComponent } from "../../components/log-list/log-list.component";

@Component({
  selector: 'app-cronjob',
  imports: [
    CronExpressionDescriptionPipe,
    HandleKeyPipe,
    CommonModule,
    LogTableComponent,
    LogListComponent
],
  templateUrl: './cronjob.component.html',
  styleUrl: './cronjob.component.scss',
  providers: [
    GetLogsForCronJobUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
    GetCronJobUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ]
})
export class CronjobComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);

  getLogsForCronJobUseCase = inject(GetLogsForCronJobUseCaseService);
  getCronJobUseCase = inject(GetCronJobUseCaseService);

  cronJobKey?: string | null = null;
  cronJobLogs: Log[] = [];
  cronJob?: CronJob;

  durationHelper: DurationHelper = new DurationHelper();

  ngOnInit(): void {
    this.cronJobKey = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCronJob();
    this.getLogs();
  }

  calculateDuration({ startTime, endTime }: Duration): string {
    return this.durationHelper.calculateDuration({ startTime, endTime });
  }

  getCronJob() {
    if (this.cronJobKey) {
      this.getCronJobUseCase.execute({ key: this.cronJobKey }).subscribe({
        next: (response: HttpResponse<CronJob>) => {
          if (response.status === 200) {
            this.cronJob = response.body as CronJob;
            console.log(this.cronJob);
          }
        },
        error: (err) => {
          console.log('Error fetching Cronjob:', err);
        },
      });
    }
  }

  getLogs() {
    if (this.cronJobKey) {
      this.getLogsForCronJobUseCase
        .execute({ key: this.cronJobKey })
        .subscribe({
          next: (response: HttpResponse<Log[]>) => {
            if (response.status === 200) {
              this.cronJobLogs = response.body as Log[];
              console.log(this.cronJobLogs);
            } else {
              console.log('error - status code:', response.status);
            }
          },
          error: (err) => {
            console.log('error:', err);
          },
        });
    }
  }
}
