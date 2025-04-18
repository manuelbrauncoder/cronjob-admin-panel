import { Component, inject, OnInit } from '@angular/core';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { GetCronjobsUseCaseService } from '../../../application/use-cases/get-cronjobs-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BoolToTextPipe } from '../../pipes/bool-to-text.pipe';
import { HandleKeyPipe } from '../../pipes/handle-key.pipe';
import { CronExpressionDescriptionPipe } from '../../pipes/cron-expression-description.pipe';
import { ExecuteCronJobUseCaseService } from '../../../application/use-cases/execute-cron-job-use-case.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cronjob-table',
  imports: [
    DatePipe,
    BoolToTextPipe,
    HandleKeyPipe,
    CronExpressionDescriptionPipe,
    CommonModule
  ],
  templateUrl: './cronjob-table.component.html',
  styleUrl: './cronjob-table.component.scss',
  providers: [
    GetCronjobsUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
    ExecuteCronJobUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class CronjobTableComponent implements OnInit {
  cronjobs: CronJob[] = [];
  getCronJobsUseCase = inject(GetCronjobsUseCaseService);
  executeCronJobUseCase = inject(ExecuteCronJobUseCaseService);
  router = inject(Router);

  ngOnInit(): void {
    this.getCronJobs();
  }

  executeCronJob({ key, event }: { key: string; event: MouseEvent }) {
    event.stopPropagation();
    this.executeCronJobUseCase.execute({ key: key }).subscribe({
      next: (response: HttpResponse<void>) => {
        if (response.status === 204) {
          // show toast success
          console.log('Success');
        } else {
          // show toast error
          console.log('Error');
        }
      },
      error: (err) => {
        // show toast with error
        console.log('Error');
      },
    });
  }

  getCronJobs() {
    this.getCronJobsUseCase.execute().subscribe({
      next: (response: HttpResponse<CronJob[]>) => {
        this.cronjobs = response.body as CronJob[];
      },
      error: (err) => {
        // show toast with error
        console.log('Error');
      },
    });
  }

  redirectToDetail({ key }: { key: string }) {
    this.router.navigate(['/cronjobs', key]);
  }

  redirectToLastLog({ key, event }: { key: string; event: MouseEvent }) {
    event.stopPropagation();
    this.router.navigate(['/log', key])
  }
}
