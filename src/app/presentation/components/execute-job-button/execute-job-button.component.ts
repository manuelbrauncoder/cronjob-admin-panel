import { Component, inject, Input, model } from '@angular/core';
import { ExecuteCronJobUseCaseService } from '../../../application/use-cases/execute-cron-job-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { SnackService } from '../../services/snack.service';

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
  @Input() cronJobKey: string = ''
  executeCronJobUseCase = inject(ExecuteCronJobUseCaseService);
  snack = inject(SnackService);

  executeCronJob({ event }: { event: MouseEvent }) {
    event.stopPropagation();
    this.executeCronJobUseCase.execute({ key: this.cronJobKey }).subscribe({
      next: (response: HttpResponse<void>) => {
        if (response.status === 204) {
          this.snack.presentSnack({err: false, message: 'Success'});
        } else {
          this.snack.presentSnack({err: true, message: `Error executing ${this.cronJobKey}`})
        }
      },
      error: (err) => {
        this.snack.presentSnack({err: true, message: `Error executing ${this.cronJobKey}`})
      },
    });
  }
}
