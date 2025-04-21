import { Component, inject, model, OnInit } from '@angular/core';
import { GetLastLogUseCaseService } from '../../../application/use-cases/get-last-log-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { Log } from '../../../domain/models/log.interface';
import { HandleKeyPipe } from '../../pipes/handle-key.pipe';
import { LogListRowComponent } from '../log-list-row/log-list-row.component';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-last-log-dialog',
  imports: [HandleKeyPipe, LogListRowComponent],
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
  snack = inject(SnackService);
  lastLog?: Log;

  ngOnInit(): void {
    this.getLastLog();
  }

  getLastLog() {
    if (this.cronJobKey().length > 0) {
      this.getLastLogUseCase.execute({ key: this.cronJobKey() }).subscribe({
        next: (response: HttpResponse<Log>) => {
          if (response.status === 200) {
            this.lastLog = response.body as Log;
          } else {
            this.snack.presentSnack({
              err: true,
              message: `Error: ${response.status}`,
            });
          }
        },
        error: (err) => {
          this.snack.presentSnack({ err: true, message: `Error: ${err}` });
        },
      });
    }
  }
}
