import { Component, inject, model } from '@angular/core';
import { ExecuteCronJobUseCaseService } from '../../../application/use-cases/execute-cron-job-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-execute-job-button',
  imports: [],
  templateUrl: './execute-job-button.component.html',
  styleUrl: './execute-job-button.component.scss',
  providers: [
    ExecuteCronJobUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class ExecuteJobButtonComponent {
  cronJobKey = model.required<string>();
  executeCronJobUseCase = inject(ExecuteCronJobUseCaseService);

  executeCronJob({ event }: { event: MouseEvent }) {
    event.stopPropagation();
    this.executeCronJobUseCase.execute({ key: this.cronJobKey() }).subscribe({
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
}
