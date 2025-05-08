import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import { DurationHelper } from '../../utils/DurationHelper';
import { Duration } from '../../interfaces/duration.interface';
import { BoolToTextPipe } from '../../pipes/bool-to-text.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { Log } from '../../../domain/models/log.interface';
import { SortOrder } from '../../enums/SortOrder';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-log-table',
  imports: [BoolToTextPipe, DatePipe, CommonModule, TableModule, TooltipModule],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.scss',
})
export class LogTableComponent {
  @Input() cronJobLogs: Log[] = [];
  @Input() sortOrder: SortOrder = SortOrder.Ascending;
  @Output() sortOrderChange = new EventEmitter<SortOrder>();

  toggleSortOrder() {
    const next =
      this.sortOrder === SortOrder.Ascending
        ? SortOrder.Descending
        : SortOrder.Ascending;

    this.sortOrderChange.emit(next);
  }

  calculateDuration({ startTime, endTime }: Duration): string {
    return DurationHelper.calculateDuration({ startTime, endTime });
  }
}
