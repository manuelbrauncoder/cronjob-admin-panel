import { Log } from '../../domain/models/log.interface';
import { ErrorFilterEnum } from '../enums/ErrorFilterEnum';
import { SortOrder } from '../enums/SortOrder';

export class LogFilterHelper {
  /**
   * Filter the given Log[] by the date range
   *
   * @returns Log[]
   */
  static byDateRange({
    logs,
    start,
    end,
  }: {
    logs: Log[];
    start?: Date | null;
    end?: Date | null;
  }): Log[] {
    if (!start || !end) {
      return logs;
    }
    const from = start.getTime();
    const to = end.getTime();
    return logs.filter((log) => {
      const startTime = Date.parse(log.startTime);
      return startTime >= from && startTime <= to;
    });
  }

  /**
   *
   * Show all or only the logs with an error
   * 
   * @param logs
   * @param show
   * @returns
   */
  static byErrorStatus({
    logs,
    show,
  }: {
    logs: Log[];
    show: ErrorFilterEnum;
  }): Log[] {
    if (show === ErrorFilterEnum.All) {
      return logs;
    }
    return logs.filter((log) => log.success === false);
  }

  static sortByStartTime(params: { logs: Log[]; sort: SortOrder }): Log[] {
    const { logs, sort } = params;
    return [...logs].sort((a, b) => {
      const aMs = new Date(a.startTime).getTime();
      const bMs = new Date(b.startTime).getTime();
      return sort === SortOrder.Ascending ? aMs - bMs : bMs - aMs;
    });
  }
}
