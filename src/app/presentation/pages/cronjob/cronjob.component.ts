import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetLogsForCronJobService } from '../../../application/use-cases/get-logs-for-cron-job.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { Log } from '../../../domain/models/log.interface';

@Component({
  selector: 'app-cronjob',
  imports: [],
  templateUrl: './cronjob.component.html',
  styleUrl: './cronjob.component.scss',
  providers: [
    GetLogsForCronJobService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class CronjobComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  getLogsForCronJobUseCase = inject(GetLogsForCronJobService);
  cronJobKey?: string | null = null;
  cronJobLogs: Log[] = [];

  ngOnInit(): void {
    this.cronJobKey = this.activatedRoute.snapshot.paramMap.get('id');
    this.getLogs();
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
