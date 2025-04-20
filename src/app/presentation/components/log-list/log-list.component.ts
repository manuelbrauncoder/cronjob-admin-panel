import { Component, model } from '@angular/core';
import { Log } from '../../../domain/models/log.interface';
import { Duration } from '../../interfaces/duration.interface';
import { DurationHelper } from '../../utils/DurationHelper';
import { LogListRowComponent } from '../log-list-row/log-list-row.component';

@Component({
  selector: 'app-log-list',
  imports: [LogListRowComponent],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss',
})
export class LogListComponent {
  cronJobLogs = model.required<Log[]>();

  calculateDuration({ startTime, endTime }: Duration): string {
    return DurationHelper.calculateDuration({ startTime, endTime });
  }
}
