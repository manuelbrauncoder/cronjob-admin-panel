import { Component, inject, OnInit } from '@angular/core';
import { CronjobTableComponent } from '../../components/cronjob-table/cronjob-table.component';
import { GetCronjobsUseCaseService } from '../../../application/use-cases/get-cronjobs-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { ExecuteCronJobUseCaseService } from '../../../application/use-cases/execute-cron-job-use-case.service';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { HttpResponse } from '@angular/common/http';
import { CronjobListComponent } from '../../components/cronjob-list/cronjob-list.component';
import { LastLogDialogComponent } from '../../components/last-log-dialog/last-log-dialog.component';
import { UiService } from '../../services/ui.service';
import { fadeIn } from '../../utils/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cronjobs',
  imports: [
    CronjobTableComponent,
    CronjobListComponent,
    LastLogDialogComponent,
    FormsModule,
  ],
  templateUrl: './cronjobs.component.html',
  styleUrl: './cronjobs.component.scss',
  animations: [fadeIn],
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
export class CronjobsComponent implements OnInit {
  cronJobs: CronJob[] = [];
  getCronJobsUseCase = inject(GetCronjobsUseCaseService);
  executeCronJobUseCase = inject(ExecuteCronJobUseCaseService);
  uiService = inject(UiService);
  selectedJobKey: string = '';
  searchTerm: string = '';

  ngOnInit(): void {
    this.getCronJobs();
  }

  filteredJobs(): CronJob[] {
    if (this.searchTerm.length === 0) {
      return this.cronJobs;
    }
    return this.cronJobs.filter(job => job.key.toLowerCase().includes(this.searchTerm));
  }

  getCronJobs(): void {
    this.getCronJobsUseCase.execute().subscribe({
      next: (response: HttpResponse<CronJob[]>) => {
        this.cronJobs = response.body as CronJob[];
      },
      error: (err) => {
        // show toast with error
        console.log('Error');
      },
    });
  }

  hideLastLogDialog(): void {
    this.uiService.isLastLogDialogPresented = false;
  }
}
