import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../../../domain/models/log.interface';
import { Duration } from '../../interfaces/duration.interface';
import { DurationHelper } from '../../utils/DurationHelper';
import { LogListRowComponent } from '../log-list-row/log-list-row.component';
import { SortOrder } from '../../enums/SortOrder';

@Component({
  selector: 'app-log-list',
  imports: [LogListRowComponent],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss',
})
export class LogListComponent {
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
