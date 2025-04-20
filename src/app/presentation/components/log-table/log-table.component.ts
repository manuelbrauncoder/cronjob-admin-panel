import { Component, model } from '@angular/core';
import { DurationHelper } from '../../utils/DurationHelper';
import { Duration } from '../../interfaces/duration.interface';
import { BoolToTextPipe } from '../../pipes/bool-to-text.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { Log } from '../../../domain/models/log.interface';

@Component({
  selector: 'app-log-table',
  imports: [
    BoolToTextPipe,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.scss',
})
export class LogTableComponent {
  cronJobLogs = model.required<Log[]>();

  calculateDuration({ startTime, endTime }: Duration): string {
    return DurationHelper.calculateDuration({ startTime, endTime });
  }
}
