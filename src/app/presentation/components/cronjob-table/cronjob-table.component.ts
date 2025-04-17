import { Component, inject, OnInit } from '@angular/core';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { GetCronjobsUseCaseService } from '../../../application/use-cases/get-cronjobs-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-cronjob-table',
  imports: [],
  templateUrl: './cronjob-table.component.html',
  styleUrl: './cronjob-table.component.scss',
  providers: [
    GetCronjobsUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class CronjobTableComponent implements OnInit {
  
  cronjobs: CronJob[] = [];
  getCronJobsUseCase = inject(GetCronjobsUseCaseService);

  ngOnInit(): void {
    this.getCronJobs();
  }

  getCronJobs() {
    this.getCronJobsUseCase.execute().subscribe({
      next: (response: HttpResponse<CronJob[]>) => {
        this.cronjobs = response.body as CronJob[];
      },
      error: (err) => {
        // show toast with error
      },
    });
  }
}
