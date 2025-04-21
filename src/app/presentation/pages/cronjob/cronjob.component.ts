import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetLogsForCronJobUseCaseService } from '../../../application/use-cases/get-logs-for-cron-job-use-case.service';
import { CronJobRepository } from '../../../domain/services/cronjob-repository';
import { CronjobApiService } from '../../../infrastructure/services/cronjob-api.service';
import { HttpResponse } from '@angular/common/http';
import { Log } from '../../../domain/models/log.interface';
import { GetCronJobUseCaseService } from '../../../application/use-cases/get-cron-job-use-case.service';
import { CronJob } from '../../../domain/models/cronjob.interface';
import { CronExpressionDescriptionPipe } from '../../pipes/cron-expression-description.pipe';
import { HandleKeyPipe } from '../../pipes/handle-key.pipe';
import { CommonModule } from '@angular/common';
import { Duration } from '../../interfaces/duration.interface';
import { DurationHelper } from '../../utils/DurationHelper';
import { LogTableComponent } from '../../components/log-table/log-table.component';
import { LogListComponent } from '../../components/log-list/log-list.component';
import { RadioButtonComponent } from '../../components/radio-button/radio-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { LogFilterHelper } from '../../utils/LogFilterHelper';
import { ErrorFilterEnum } from '../../enums/ErrorFilterEnum';
import { SortOrder } from '../../enums/SortOrder';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-cronjob',
  imports: [
    CronExpressionDescriptionPipe,
    HandleKeyPipe,
    CommonModule,
    LogTableComponent,
    LogListComponent,
    RadioButtonComponent,
    MatFormField,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
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
    provideNativeDateAdapter(),
  ],
})
export class CronjobComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);

  getLogsForCronJobUseCase = inject(GetLogsForCronJobUseCaseService);
  getCronJobUseCase = inject(GetCronJobUseCaseService);
  snack = inject(SnackService);

  cronJobKey?: string | null = null;
  cronJobLogs: Log[] = [];
  cronJob?: CronJob;

  show: ErrorFilterEnum = ErrorFilterEnum.All;
  sortOrder: SortOrder = SortOrder.Ascending;

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  /**
   * Filter the logs by:
   *  - Date Range and, or
   *  - only with error
   * @returns
   */
  filteredLogs(): Log[] {
    const start = this.range.get('start')?.value;
    const end = this.range.get('end')?.value;

    let result = this.cronJobLogs;

    result = LogFilterHelper.byDateRange({
      logs: result,
      start: start,
      end: end,
    });
    result = LogFilterHelper.byErrorStatus({ logs: result, show: this.show });
    result = LogFilterHelper.sortByStartTime({
      logs: result,
      sort: this.sortOrder,
    });

    return result;
  }

  resetFilter() {
    this.range.reset();
    this.show = ErrorFilterEnum.All;
  }

  ngOnInit(): void {
    this.cronJobKey = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCronJob();
    this.getLogs();
  }

  calculateDuration({ startTime, endTime }: Duration): string {
    return DurationHelper.calculateDuration({ startTime, endTime });
  }

  getCronJob() {
    if (this.cronJobKey) {
      this.getCronJobUseCase.execute({ key: this.cronJobKey }).subscribe({
        next: (response: HttpResponse<CronJob>) => {
          if (response.status === 200) {
            this.cronJob = response.body as CronJob;
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

  getLogs() {
    if (this.cronJobKey) {
      this.getLogsForCronJobUseCase
        .execute({ key: this.cronJobKey })
        .subscribe({
          next: (response: HttpResponse<Log[]>) => {
            if (response.status === 200) {
              this.cronJobLogs = response.body as Log[];
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
