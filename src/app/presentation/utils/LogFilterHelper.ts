import { Log } from '../../domain/models/log.interface';
import { ErrorFilterEnum } from '../enums/ErrorFilterEnum';

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
}
