import { Component, Input, model } from '@angular/core';
import { Log } from '../../../domain/models/log.interface';
import { DatePipe } from '@angular/common';
import { BoolToTextPipe } from '../../pipes/bool-to-text.pipe';
import { DurationHelper } from '../../utils/DurationHelper';
import { Duration } from '../../interfaces/duration.interface';

@Component({
  selector: 'app-log-list-row',
  imports: [DatePipe, BoolToTextPipe],
  templateUrl: './log-list-row.component.html',
  styleUrl: './log-list-row.component.scss'
})
export class LogListRowComponent {
  @Input() log?: Log; 
  durationHelper: DurationHelper = new DurationHelper();

  calculateDuration({ startTime, endTime }: Duration): string {
    return this.durationHelper.calculateDuration({ startTime, endTime });
  }
}
