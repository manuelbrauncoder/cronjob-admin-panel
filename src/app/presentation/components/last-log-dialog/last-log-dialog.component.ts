import { Component, inject, model, OnInit } from '@angular/core';
import { GetLastLogUseCaseService } from '../../../application/use-cases/get-last-log-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { Log } from '../../../domain/models/log.interface';
import { HandleKeyPipe } from '../../pipes/handle-key.pipe';
import { DatePipe } from '@angular/common';
import { DurationHelper } from '../../utils/DurationHelper';
import { Duration } from '../../interfaces/duration.interface';
import { BoolToTextPipe } from '../../pipes/bool-to-text.pipe';

@Component({
  selector: 'app-last-log-dialog',
  imports: [HandleKeyPipe, DatePipe, BoolToTextPipe],
  templateUrl: './last-log-dialog.component.html',
  styleUrl: './last-log-dialog.component.scss',
  providers: [
    GetLastLogUseCaseService,
    {
      provide: CronJobRepository,
      useClass: CronjobApiService,
    },
  ],
})
export class LastLogDialogComponent implements OnInit {
  cronJobKey = model.required<string>();
  getLastLogUseCase = inject(GetLastLogUseCaseService);
  lastLog?: Log;
  durationHelper: DurationHelper = new DurationHelper();

  ngOnInit(): void {
    this.getLastLog();
  }

  calculateDuration({ startTime, endTime }: Duration): string {
    return this.durationHelper.calculateDuration({ startTime, endTime });
  }

  getLastLog() {
    if (this.cronJobKey().length > 0) {
      this.getLastLogUseCase.execute({ key: this.cronJobKey() }).subscribe({
        next: (response: HttpResponse<Log>) => {
          if (response.status === 200) {
            this.lastLog = response.body as Log;
          } else {
            console.log('no log found');
          }
        },
        error: (err) => {
          console.log('Error fetching last log:', err);
        },
      });
    }
  }
}
