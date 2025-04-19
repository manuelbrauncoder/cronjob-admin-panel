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
import { UiService } from '../../services/ui.service';
import { LastLogDialogComponent } from '../last-log-dialog/last-log-dialog.component';
import { fadeIn, slideFromBottom, slideFromTop } from '../../utils/animations';

@Component({
  selector: 'app-cronjob-table',
  imports: [
    DatePipe,
    BoolToTextPipe,
    HandleKeyPipe,
    CronExpressionDescriptionPipe,
    CommonModule,
    LastLogDialogComponent,
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
  animations: [slideFromBottom, slideFromTop, fadeIn],
})
export class CronjobTableComponent implements OnInit {
  cronjobs: CronJob[] = [];
  getCronJobsUseCase = inject(GetCronjobsUseCaseService);
  executeCronJobUseCase = inject(ExecuteCronJobUseCaseService);
  uiService = inject(UiService);
  router = inject(Router);
  cronJobKey: string = '';

  ngOnInit(): void {
    this.getCronJobs();
  }

  showLastLogDialog({ key }: { key: string }): void {
    this.cronJobKey = key;
    this.uiService.isLastLogDialogPresented = true;
  }

  hideLastLogDialog(): void {
    this.uiService.isLastLogDialogPresented = false;
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

  getCronJobs(): void {
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

  redirectToDetail({ key }: { key: string }): void {
    this.router.navigate(['/cronjobs', key]);
  }
}
